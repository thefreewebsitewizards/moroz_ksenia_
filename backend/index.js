// backend/index.js

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';

const app = express();
app.use(cors());
app.use(express.json());

// Add a root route
app.get('/', (req, res) => {
  res.json({ message: 'Moroz Ksenia Art Backend API is running!' });
});

// Mount routes
app.use('/', userRoutes);
app.use('/api', productRoutes);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});