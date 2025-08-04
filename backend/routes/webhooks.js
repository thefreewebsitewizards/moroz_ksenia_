const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Import utilities
const {
  createOrder,
  updateOrderStatus,
  updateArtistAccountStatus,
  getArtistByStripeAccount,
  logPaymentEvent,
  createNotification,
  getUserByEmail
} = require('../utils/firebase');

const {
  sendOrderConfirmationEmail,
  sendPaymentFailureEmail,
  sendArtistNotificationEmail
} = require('../utils/email');

// Webhook endpoint secret
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Helper function to log webhook events
const logWebhookEvent = (event) => {
  console.log(`📧 Webhook received: ${event.type} [${event.id}]`);
  if (process.env.LOG_LEVEL === 'debug') {
    console.log('Event data:', JSON.stringify(event.data, null, 2));
  }
};

// Helper function to handle payment success
const handlePaymentSuccess = async (paymentIntent) => {
  try {
    console.log(`💰 Payment succeeded: ${paymentIntent.id}`);
    console.log(`Amount: $${(paymentIntent.amount / 100).toFixed(2)} ${paymentIntent.currency.toUpperCase()}`);
    console.log(`Customer: ${paymentIntent.metadata?.customerEmail || 'Unknown'}`);
    
    const customerEmail = paymentIntent.metadata?.customerEmail;
    const orderItems = JSON.parse(paymentIntent.metadata?.orderItems || '[]');
    
    // 1. Create order in Firebase
    const orderData = {
      paymentIntentId: paymentIntent.id,
      customerEmail,
      items: orderItems,
      total: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: 'paid',
      paymentMethod: 'stripe',
      stripeChargeId: paymentIntent.latest_charge,
      metadata: paymentIntent.metadata
    };
    
    const orderId = await createOrder(orderData);
    console.log(`📦 Order created: ${orderId}`);
    
    // 2. Send confirmation email to customer
    if (customerEmail) {
      await sendOrderConfirmationEmail(customerEmail, paymentIntent);
    }
    
    // 3. Notify artist if connected account
    if (paymentIntent.on_behalf_of) {
      const artist = await getArtistByStripeAccount(paymentIntent.on_behalf_of);
      if (artist && artist.email) {
        await sendArtistNotificationEmail(artist.email, {
          type: 'sale',
          amount: paymentIntent.amount / 100,
          customerEmail,
          orderItems
        });
      }
    }
    
    // 4. Create notification for customer
    if (customerEmail) {
      const user = await getUserByEmail(customerEmail);
      if (user) {
        await createNotification(user.id, {
          type: 'order_confirmed',
          title: 'Order Confirmed',
          message: `Your order for $${(paymentIntent.amount / 100).toFixed(2)} has been confirmed.`,
          orderId,
          paymentIntentId: paymentIntent.id
        });
      }
    }
    
    // 5. Log payment event
    await logPaymentEvent({
      type: 'payment_succeeded',
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customerEmail,
      orderId
    });
    
  } catch (error) {
    console.error('Error handling payment success:', error);
  }
};

// Helper function to handle payment failure
const handlePaymentFailure = async (paymentIntent) => {
  try {
    console.log(`❌ Payment failed: ${paymentIntent.id}`);
    console.log(`Reason: ${paymentIntent.last_payment_error?.message || 'Unknown'}`);
    console.log(`Customer: ${paymentIntent.metadata?.customerEmail || 'Unknown'}`);
    
    const customerEmail = paymentIntent.metadata?.customerEmail;
    
    // 1. Send failure notification to customer
    if (customerEmail) {
      await sendPaymentFailureEmail(customerEmail, paymentIntent);
    }
    
    // 2. Create notification for customer
    if (customerEmail) {
      const user = await getUserByEmail(customerEmail);
      if (user) {
        await createNotification(user.id, {
          type: 'payment_failed',
          title: 'Payment Failed',
          message: `Payment failed: ${paymentIntent.last_payment_error?.message || 'Unknown error'}`,
          paymentIntentId: paymentIntent.id
        });
      }
    }
    
    // 3. Log payment event
    await logPaymentEvent({
      type: 'payment_failed',
      paymentIntentId: paymentIntent.id,
      amount: paymentIntent.amount,
      currency: paymentIntent.currency,
      customerEmail,
      error: paymentIntent.last_payment_error?.message,
      errorCode: paymentIntent.last_payment_error?.code
    });
    
  } catch (error) {
    console.error('Error handling payment failure:', error);
  }
};

// Helper function to handle account updates
const handleAccountUpdate = async (account) => {
  try {
    console.log(`🏪 Account updated: ${account.id}`);
    console.log(`Charges enabled: ${account.charges_enabled}`);
    console.log(`Payouts enabled: ${account.payouts_enabled}`);
    console.log(`Details submitted: ${account.details_submitted}`);
    
    // 1. Update artist account status in Firebase
    await updateArtistAccountStatus(account.id, {
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted,
      requirements: account.requirements,
      capabilities: account.capabilities,
      business_profile: account.business_profile
    });
    
    // 2. Get artist and send notification if significant changes
    const artist = await getArtistByStripeAccount(account.id);
    if (artist && artist.email) {
      // Notify if account becomes fully enabled
      if (account.charges_enabled && account.payouts_enabled && account.details_submitted) {
        await createNotification(artist.id, {
          type: 'account_activated',
          title: 'Account Fully Activated',
          message: 'Your Stripe account is now fully activated and ready to receive payments!',
          stripeAccountId: account.id
        });
      }
      
      // Notify if there are requirements that need attention
      if (account.requirements && account.requirements.currently_due && account.requirements.currently_due.length > 0) {
        await createNotification(artist.id, {
          type: 'account_requirements',
          title: 'Account Information Required',
          message: `Please complete your account setup. ${account.requirements.currently_due.length} items need attention.`,
          stripeAccountId: account.id
        });
      }
    }
    
  } catch (error) {
    console.error('Error handling account update:', error);
  }
};

// Main webhook handler
router.post('/stripe', (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // Verify webhook signature
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('⚠️ Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Log the event
  logWebhookEvent(event);

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      handlePaymentSuccess(event.data.object);
      break;

    case 'payment_intent.payment_failed':
      handlePaymentFailure(event.data.object);
      break;

    case 'checkout.session.completed':
      const session = event.data.object;
      console.log(`🛒 Checkout session completed: ${session.id}`);
      console.log(`Payment status: ${session.payment_status}`);
      console.log(`Customer: ${session.customer_email}`);
      
      // If payment was successful, handle it
      if (session.payment_status === 'paid') {
        // You can retrieve the payment intent if needed
        // const paymentIntent = await stripe.paymentIntents.retrieve(session.payment_intent);
        console.log(`💳 Payment completed for session ${session.id}`);
      }
      break;

    case 'account.updated':
      handleAccountUpdate(event.data.object);
      break;

    case 'account.application.deauthorized':
      const application = event.data.object;
      console.log(`🔓 Account deauthorized: ${application.account}`);
      // Handle account disconnection
      break;

    case 'transfer.created':
      const transfer = event.data.object;
      console.log(`💸 Transfer created: ${transfer.id}`);
      console.log(`Amount: $${(transfer.amount / 100).toFixed(2)} to ${transfer.destination}`);
      break;

    case 'payout.created':
      const payout = event.data.object;
      console.log(`💰 Payout created: ${payout.id}`);
      console.log(`Amount: $${(payout.amount / 100).toFixed(2)} ${payout.currency.toUpperCase()}`);
      break;

    case 'payout.paid':
      const paidPayout = event.data.object;
      console.log(`✅ Payout paid: ${paidPayout.id}`);
      console.log(`Amount: $${(paidPayout.amount / 100).toFixed(2)} ${paidPayout.currency.toUpperCase()}`);
      break;

    case 'payout.failed':
      const failedPayout = event.data.object;
      console.log(`❌ Payout failed: ${failedPayout.id}`);
      console.log(`Failure reason: ${failedPayout.failure_message}`);
      break;

    case 'invoice.payment_succeeded':
      const invoice = event.data.object;
      console.log(`📄 Invoice payment succeeded: ${invoice.id}`);
      break;

    case 'invoice.payment_failed':
      const failedInvoice = event.data.object;
      console.log(`📄 Invoice payment failed: ${failedInvoice.id}`);
      break;

    case 'customer.subscription.created':
    case 'customer.subscription.updated':
    case 'customer.subscription.deleted':
      const subscription = event.data.object;
      console.log(`🔄 Subscription ${event.type.split('.').pop()}: ${subscription.id}`);
      console.log(`Status: ${subscription.status}`);
      break;

    case 'charge.dispute.created':
      const dispute = event.data.object;
      console.log(`⚠️ Dispute created: ${dispute.id}`);
      console.log(`Amount: $${(dispute.amount / 100).toFixed(2)} ${dispute.currency.toUpperCase()}`);
      console.log(`Reason: ${dispute.reason}`);
      // Handle dispute - notify relevant parties
      break;

    default:
      console.log(`🤷 Unhandled event type: ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true, eventType: event.type, eventId: event.id });
});

// Health check for webhooks
router.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    webhook_endpoint: '/api/webhooks/stripe',
    timestamp: new Date().toISOString()
  });
});

// Test webhook endpoint (for development)
router.post('/test', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({
      error: 'Test endpoint not available in production'
    });
  }

  console.log('🧪 Test webhook received:', req.body);
  res.json({
    message: 'Test webhook received successfully',
    timestamp: new Date().toISOString(),
    body: req.body
  });
});

module.exports = router;