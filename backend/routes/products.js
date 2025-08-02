// backend/routes/products.js

import express from 'express';
import { 
  addDoc, 
  getDocs, 
  doc, 
  getDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { ProductCollection, storage } from '../config/firebase.js';
import multer from 'multer';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// GET /api/products - Get all products with pagination and filtering
router.get('/products', async (req, res) => {
  try {
    console.log('GET /products called with query:', req.query);
    const { category, search, page = 1, limit: pageLimit = 12 } = req.query;
    
    console.log('Querying ProductCollection...');
    let q = query(ProductCollection, orderBy('dateAdded', 'desc'));
    
    // Apply category filter
    if (category && category !== 'all') {
      console.log('Applying category filter:', category);
      q = query(ProductCollection, where('category', '==', category), orderBy('dateAdded', 'desc'));
    }
    
    console.log('Executing Firebase query...');
    const snapshot = await getDocs(q);
    console.log('Query successful, found', snapshot.docs.length, 'documents');
    
    let products = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Apply search filter
    if (search) {
      console.log('Applying search filter:', search);
      const searchLower = search.toLowerCase();
      products = products.filter(product => 
        (product.name && product.name.toLowerCase().includes(searchLower)) ||
        (product.description && product.description.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination
    const totalCount = products.length;
    const totalPages = Math.ceil(totalCount / pageLimit);
    const startIndex = (page - 1) * pageLimit;
    const endIndex = startIndex + parseInt(pageLimit);
    const paginatedProducts = products.slice(startIndex, endIndex);
    
    console.log('Returning', paginatedProducts.length, 'products');
    res.status(200).json({
      products: paginatedProducts,
      totalCount,
      totalPages,
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Detailed error fetching products:', {
      message: error.message,
      code: error.code,
      stack: error.stack
    });
    res.status(500).json({ 
      error: error.message,
      code: error.code || 'UNKNOWN_ERROR'
    });
  }
});

// GET /api/products/:id - Get single product
router.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(ProductCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.status(200).json({
      id: docSnap.id,
      ...docSnap.data()
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST /api/products - Create new product
router.post('/products', upload.single('image'), async (req, res) => {
  try {
    const { name, category, price, size, description, stock, status } = req.body;
    
    // Validation
    if (!name || !category || !price || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    let imageUrl = null;
    
    // Handle image upload with better error handling
    if (req.file) {
      try {
        console.log('Starting image upload...');
        const fileName = `products/${Date.now()}_${req.file.originalname}`;
        const storageRef = ref(storage, fileName);
        
        console.log('Uploading to Firebase Storage:', fileName);
        await uploadBytes(storageRef, req.file.buffer);
        imageUrl = await getDownloadURL(storageRef);
        console.log('Upload successful, URL:', imageUrl);
      } catch (storageError) {
        console.error('Firebase Storage Error Details:', {
          code: storageError.code,
          message: storageError.message,
          serverResponse: storageError.serverResponse
        });
        return res.status(500).json({ 
          error: 'Image upload failed', 
          details: storageError.message,
          code: storageError.code
        });
      }
    }
    
    const productData = {
      name,
      category,
      price: parseFloat(price),
      size: size || '',
      description,
      stock: parseInt(stock) || 0,
      status: status || 'active',
      image: imageUrl,
      dateAdded: new Date().toISOString()
    };
    
    const docRef = await addDoc(ProductCollection, productData);
    
    res.status(201).json({
      id: docRef.id,
      ...productData,
      message: 'Product created successfully'
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// PUT /api/products/:id - Update product
router.put('/products/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, price, size, description, stock, status } = req.body;
    
    const docRef = doc(ProductCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    let imageUrl = docSnap.data().image;
    
    // Handle new image upload
    if (req.file) {
      // Delete old image if exists
      if (imageUrl) {
        try {
          const oldImageRef = ref(storage, imageUrl);
          await deleteObject(oldImageRef);
        } catch (deleteError) {
          console.log('Old image not found or already deleted');
        }
      }
      
      const fileName = `products/${Date.now()}_${req.file.originalname}`;
      const storageRef = ref(storage, fileName);
      
      await uploadBytes(storageRef, req.file.buffer);
      imageUrl = await getDownloadURL(storageRef);
    }
    
    const updateData = {
      name,
      category,
      price: parseFloat(price),
      size: size || '',
      description,
      stock: parseInt(stock) || 0,
      status: status || 'active',
      image: imageUrl,
      dateUpdated: new Date().toISOString()
    };
    
    await updateDoc(docRef, updateData);
    
    res.status(200).json({
      id,
      ...updateData,
      message: 'Product updated successfully'
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/products/:id - Delete product
router.delete('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(ProductCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Delete image if exists
    const productData = docSnap.data();
    if (productData.image) {
      try {
        const imageRef = ref(storage, productData.image);
        await deleteObject(imageRef);
      } catch (deleteError) {
        console.log('Image not found or already deleted');
      }
    }
    
    await deleteDoc(docRef);
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;