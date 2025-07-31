// backend/index.js

import express from 'express';
import cors from 'cors';
import userRoutes from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/', userRoutes);

app.listen(4000, () => {
  console.log('Server running on http://localhost:4000');
});
