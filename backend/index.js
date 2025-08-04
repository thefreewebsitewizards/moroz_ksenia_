// backend/index.js

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';
import productRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import customerRoutes from './routes/customers.js';

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
app.use('/api', orderRoutes);
app.use('/api', customerRoutes);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});