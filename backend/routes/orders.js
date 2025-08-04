// backend/routes/orders.js

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
  limit 
} from 'firebase/firestore';
import { OrderCollection } from '../config/firebase.js';

const router = express.Router();

// GET /api/orders - Get all orders
router.get('/orders', async (req, res) => {
  try {
    console.log('GET /orders called');
    const q = query(OrderCollection, orderBy('orderDate', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders = [];
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    console.log(`Found ${orders.length} orders`);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/:id - Get order by ID
router.get('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(OrderCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      res.json({ success: true, data: { id: docSnap.id, ...docSnap.data() } });
    } else {
      res.status(404).json({ success: false, error: 'Order not found' });
    }
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// PUT /api/orders/:id - Update order status
router.put('/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, error: 'Status is required' });
    }
    
    const docRef = doc(OrderCollection, id);
    await updateDoc(docRef, { 
      status: status,
      updatedAt: new Date().toISOString()
    });
    
    res.json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/orders/analytics - Get order analytics
router.get('/orders/analytics', async (req, res) => {
  try {
    const querySnapshot = await getDocs(OrderCollection);
    
    let totalRevenue = 0;
    let totalOrders = 0;
    const statusCounts = {
      pending: 0,
      processing: 0,
      shipped: 0,
      delivered: 0,
      cancelled: 0
    };
    
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      totalOrders++;
      totalRevenue += parseFloat(order.total || 0);
      
      if (statusCounts.hasOwnProperty(order.status)) {
        statusCounts[order.status]++;
      }
    });
    
    res.json({ 
      success: true, 
      data: {
        totalRevenue,
        totalOrders,
        statusCounts
      }
    });
  } catch (error) {
    console.error('Error fetching order analytics:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;