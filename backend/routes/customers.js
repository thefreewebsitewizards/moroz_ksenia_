// backend/routes/customers.js

import express from 'express';
import { 
  getDocs, 
  doc, 
  getDoc, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { UserCollection } from '../config/firebase.js';

const router = express.Router();

// GET /api/customers - Get all customers
router.get('/customers', async (req, res) => {
  try {
    console.log('GET /customers called');
    const q = query(UserCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const customers = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      // Don't include sensitive data like passwords
      const { password, ...safeUserData } = userData;
      customers.push({
        id: doc.id,
        ...safeUserData
      });
    });
    
    console.log(`Found ${customers.length} customers`);
    res.json({ success: true, data: customers });
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/customers/:id - Get customer by ID
router.get('/customers/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const docRef = doc(UserCollection, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      const userData = docSnap.data();
      // Don't include sensitive data like passwords
      const { password, ...safeUserData } = userData;
      res.json({ success: true, data: { id: docSnap.id, ...safeUserData } });
    } else {
      res.status(404).json({ success: false, error: 'Customer not found' });
    }
  } catch (error) {
    console.error('Error fetching customer:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET /api/customers/analytics - Get customer analytics
router.get('/customers/analytics', async (req, res) => {
  try {
    const querySnapshot = await getDocs(UserCollection);
    
    let totalCustomers = 0;
    const registrationsByMonth = {};
    
    querySnapshot.forEach((doc) => {
      const customer = doc.data();
      totalCustomers++;
      
      // Group by month if createdAt exists
      if (customer.createdAt) {
        const date = new Date(customer.createdAt);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
        registrationsByMonth[monthKey] = (registrationsByMonth[monthKey] || 0) + 1;
      }
    });
    
    res.json({ 
      success: true, 
      data: {
        totalCustomers,
        registrationsByMonth
      }
    });
  } catch (error) {
    console.error('Error fetching customer analytics:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;