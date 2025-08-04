const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let firebaseApp;

try {
  // Initialize with service account key
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: process.env.FIREBASE_DATABASE_URL
    });
  } else {
    // Fallback to default credentials (for local development)
    firebaseApp = admin.initializeApp();
  }
  
  console.log('✅ Firebase Admin SDK initialized successfully');
} catch (error) {
  console.error('❌ Error initializing Firebase Admin SDK:', error);
}

const db = admin.firestore();

// Helper function to create order in Firestore
const createOrder = async (orderData) => {
  try {
    const orderRef = await db.collection('orders').add({
      ...orderData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`📦 Order created: ${orderRef.id}`);
    return orderRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Helper function to update order status
const updateOrderStatus = async (orderId, status, additionalData = {}) => {
  try {
    const orderRef = db.collection('orders').doc(orderId);
    
    await orderRef.update({
      status,
      ...additionalData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`📦 Order ${orderId} status updated to: ${status}`);
    return true;
  } catch (error) {
    console.error(`Error updating order ${orderId}:`, error);
    throw error;
  }
};

// Helper function to get order by ID
const getOrder = async (orderId) => {
  try {
    const orderDoc = await db.collection('orders').doc(orderId).get();
    
    if (!orderDoc.exists) {
      throw new Error(`Order ${orderId} not found`);
    }
    
    return {
      id: orderDoc.id,
      ...orderDoc.data()
    };
  } catch (error) {
    console.error(`Error getting order ${orderId}:`, error);
    throw error;
  }
};

// Helper function to update artist account status
const updateArtistAccountStatus = async (stripeAccountId, accountData) => {
  try {
    // Find artist by Stripe account ID
    const artistQuery = await db.collection('artists')
      .where('stripeAccountId', '==', stripeAccountId)
      .limit(1)
      .get();
    
    if (artistQuery.empty) {
      console.log(`No artist found with Stripe account ID: ${stripeAccountId}`);
      return false;
    }
    
    const artistDoc = artistQuery.docs[0];
    await artistDoc.ref.update({
      stripeAccountStatus: accountData,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`🎨 Artist account status updated for: ${stripeAccountId}`);
    return true;
  } catch (error) {
    console.error(`Error updating artist account ${stripeAccountId}:`, error);
    throw error;
  }
};

// Helper function to create artist account
const createArtistAccount = async (artistData) => {
  try {
    const artistRef = await db.collection('artists').add({
      ...artistData,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`🎨 Artist account created: ${artistRef.id}`);
    return artistRef.id;
  } catch (error) {
    console.error('Error creating artist account:', error);
    throw error;
  }
};

// Helper function to get artist by Stripe account ID
const getArtistByStripeAccount = async (stripeAccountId) => {
  try {
    const artistQuery = await db.collection('artists')
      .where('stripeAccountId', '==', stripeAccountId)
      .limit(1)
      .get();
    
    if (artistQuery.empty) {
      return null;
    }
    
    const artistDoc = artistQuery.docs[0];
    return {
      id: artistDoc.id,
      ...artistDoc.data()
    };
  } catch (error) {
    console.error(`Error getting artist by Stripe account ${stripeAccountId}:`, error);
    throw error;
  }
};

// Helper function to log payment events
const logPaymentEvent = async (eventData) => {
  try {
    await db.collection('payment_events').add({
      ...eventData,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`📊 Payment event logged: ${eventData.type}`);
  } catch (error) {
    console.error('Error logging payment event:', error);
    // Don't throw error for logging failures
  }
};

// Helper function to create notification
const createNotification = async (userId, notificationData) => {
  try {
    await db.collection('notifications').add({
      userId,
      ...notificationData,
      read: false,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
    
    console.log(`🔔 Notification created for user: ${userId}`);
  } catch (error) {
    console.error(`Error creating notification for user ${userId}:`, error);
    // Don't throw error for notification failures
  }
};

// Helper function to update product inventory
const updateProductInventory = async (productId, quantityChange) => {
  try {
    const productRef = db.collection('products').doc(productId);
    
    await db.runTransaction(async (transaction) => {
      const productDoc = await transaction.get(productRef);
      
      if (!productDoc.exists) {
        throw new Error(`Product ${productId} not found`);
      }
      
      const currentInventory = productDoc.data().inventory || 0;
      const newInventory = Math.max(0, currentInventory + quantityChange);
      
      transaction.update(productRef, {
        inventory: newInventory,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    });
    
    console.log(`📦 Product ${productId} inventory updated by ${quantityChange}`);
  } catch (error) {
    console.error(`Error updating product inventory ${productId}:`, error);
    throw error;
  }
};

// Helper function to get user by email
const getUserByEmail = async (email) => {
  try {
    const userQuery = await db.collection('users')
      .where('email', '==', email)
      .limit(1)
      .get();
    
    if (userQuery.empty) {
      return null;
    }
    
    const userDoc = userQuery.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
  } catch (error) {
    console.error(`Error getting user by email ${email}:`, error);
    throw error;
  }
};

module.exports = {
  admin,
  db,
  createOrder,
  updateOrderStatus,
  getOrder,
  updateArtistAccountStatus,
  createArtistAccount,
  getArtistByStripeAccount,
  logPaymentEvent,
  createNotification,
  updateProductInventory,
  getUserByEmail
};