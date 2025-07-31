// backend/server.js - Enhanced version with security and validation
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, param, query, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const { admin, db, storage } = require('./config/firebase-admin');

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:5500'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Configure multer for file uploads with validation
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
    files: 1 // Only one file at a time
  },
  fileFilter: (req, file, cb) => {
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG, PNG, and WebP images are allowed!'), false);
    }
  }
});

// Validation middleware
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array()
    });
  }
  next();
};

// Product validation rules
const productValidation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Product name must be between 1 and 100 characters'),
  body('category')
    .isIn(['postcards', 'wall-art', 'bookmarks', 'custom'])
    .withMessage('Invalid category'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('stock')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Stock must be a non-negative integer'),
  body('status')
    .optional()
    .isIn(['active', 'inactive', 'sold'])
    .withMessage('Invalid status'),
  body('size')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('Size must be less than 50 characters')
];

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// GET all products with enhanced filtering and pagination
app.get('/api/products', [
  query('category').optional().isIn(['all', 'postcards', 'wall-art', 'bookmarks', 'custom']),
  query('search').optional().trim().isLength({ max: 100 }),
  query('page').optional().isInt({ min: 1 }),
  query('limit').optional().isInt({ min: 1, max: 50 }),
  query('sortBy').optional().isIn(['name', 'price', 'dateAdded', 'stock']),
  query('sortOrder').optional().isIn(['asc', 'desc']),
  handleValidationErrors
], async (req, res) => {
  try {
    const { 
      category = 'all', 
      search, 
      page = 1, 
      limit = 12,
      sortBy = 'dateAdded',
      sortOrder = 'desc'
    } = req.query;

    let query = db.collection('products');

    // Filter by category
    if (category && category !== 'all') {
      query = query.where('category', '==', category);
    }

    // Apply sorting
    const sortDirection = sortOrder === 'desc' ? 'desc' : 'asc';
    query = query.orderBy(sortBy, sortDirection);

    // Get all documents for search and pagination
    const snapshot = await query.get();
    let products = [];

    snapshot.forEach(doc => {
      const data = doc.data();
      products.push({
        id: doc.id,
        ...data,
        dateAdded: data.dateAdded?.toDate?.() || new Date(data.dateAdded) || new Date(),
        dateModified: data.dateModified?.toDate?.() || (data.dateModified ? new Date(data.dateModified) : null)
      });
    });

    // Apply search filter
    if (search) {
      const searchTerm = search.toLowerCase();
      products = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        (product.category && product.category.toLowerCase().includes(searchTerm))
      );
    }

    // Calculate pagination
    const totalCount = products.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedProducts = products.slice(startIndex, endIndex);

    res.json({
      products: paginatedProducts,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ 
      error: 'Failed to fetch products',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// GET single product
app.get('/api/products/:id', [
  param('id').isLength({ min: 1 }).withMessage('Product ID is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const doc = await db.collection('products').doc(req.params.id).get();
    
    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const data = doc.data();
    const product = {
      id: doc.id,
      ...data,
      dateAdded: data.dateAdded?.toDate?.() || new Date(data.dateAdded) || new Date(),
      dateModified: data.dateModified?.toDate?.() || (data.dateModified ? new Date(data.dateModified) : null)
    };

    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ 
      error: 'Failed to fetch product',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// POST new product
app.post('/api/products', upload.single('image'), productValidation, handleValidationErrors, async (req, res) => {
  try {
    const {
      name,
      category,
      price,
      size = '',
      description,
      stock = 0,
      status = 'active'
    } = req.body;

    let imageUrl = '';

    // Handle image upload
    if (req.file) {
      try {
        const bucket = storage.bucket();
        const fileName = `products/${Date.now()}_${Math.random().toString(36).substring(2)}_${req.file.originalname}`;
        const file = bucket.file(fileName);

        const stream = file.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
            cacheControl: 'public, max-age=31536000'
          },
          resumable: false
        });

        await new Promise((resolve, reject) => {
          stream.on('error', reject);
          stream.on('finish', resolve);
          stream.end(req.file.buffer);
        });

        // Make the file public
        await file.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    }

    const productData = {
      name: name.trim(),
      category,
      price: parseFloat(price),
      size: size.trim(),
      description: description.trim(),
      stock: parseInt(stock),
      status,
      image: imageUrl,
      dateAdded: admin.firestore.FieldValue.serverTimestamp(),
      dateModified: null
    };

    const docRef = await db.collection('products').add(productData);
    
    res.status(201).json({
      id: docRef.id,
      ...productData,
      dateAdded: new Date(),
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      error: 'Failed to create product',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// PUT update product
app.put('/api/products/:id', upload.single('image'), [
  param('id').isLength({ min: 1 }).withMessage('Product ID is required'),
  ...productValidation.map(validation => validation.optional()),
  handleValidationErrors
], async (req, res) => {
  try {
    const productId = req.params.id;
    const productRef = db.collection('products').doc(productId);
    const doc = await productRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const existingData = doc.data();
    let imageUrl = existingData.image;

    // Handle new image upload
    if (req.file) {
      try {
        const bucket = storage.bucket();
        const fileName = `products/${Date.now()}_${Math.random().toString(36).substring(2)}_${req.file.originalname}`;
        const file = bucket.file(fileName);

        const stream = file.createWriteStream({
          metadata: {
            contentType: req.file.mimetype,
            cacheControl: 'public, max-age=31536000'
          },
          resumable: false
        });

        await new Promise((resolve, reject) => {
          stream.on('error', reject);
          stream.on('finish', resolve);
          stream.end(req.file.buffer);
        });

        await file.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        // Delete old image if it exists
        if (existingData.image) {
          try {
            const oldFileName = existingData.image.split('/').slice(-1)[0];
            await bucket.file(`products/${oldFileName}`).delete();
          } catch (deleteError) {
            console.warn('Failed to delete old image:', deleteError.message);
          }
        }
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image' });
      }
    }

    // Prepare update data
    const updateData = {};
    const { name, category, price, size, description, stock, status } = req.body;

    if (name !== undefined) updateData.name = name.trim();
    if (category !== undefined) updateData.category = category;
    if (price !== undefined) updateData.price = parseFloat(price);
    if (size !== undefined) updateData.size = size.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (stock !== undefined) updateData.stock = parseInt(stock);
    if (status !== undefined) updateData.status = status;
    
    updateData.image = imageUrl;
    updateData.dateModified = admin.firestore.FieldValue.serverTimestamp();

    await productRef.update(updateData);

    res.json({
      id: productId,
      ...existingData,
      ...updateData,
      dateModified: new Date(),
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      error: 'Failed to update product',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// DELETE product
app.delete('/api/products/:id', [
  param('id').isLength({ min: 1 }).withMessage('Product ID is required'),
  handleValidationErrors
], async (req, res) => {
  try {
    const productId = req.params.id;
    const productRef = db.collection('products').doc(productId);
    const doc = await productRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const productData = doc.data();

    // Delete associated image
    if (productData.image) {
      try {
        const bucket = storage.bucket();
        const fileName = productData.image.split('/').slice(-1)[0];
        await bucket.file(`products/${fileName}`).delete();
      } catch (deleteError) {
        console.warn('Failed to delete image:', deleteError.message);
      }
    }

    await productRef.delete();

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      error: 'Failed to delete product',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ error: 'Too many files. Only one file allowed.' });
    }
  }

  if (error.message === 'Only JPEG, PNG, and WebP images are allowed!') {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`Received ${signal}. Graceful shutdown...`);
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔥 Firebase Project: ${process.env.FIREBASE_PROJECT_ID}`);
});

module.exports = app;