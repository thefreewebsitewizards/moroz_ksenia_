const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Helper function to calculate application fee
const calculateApplicationFee = (amount) => {
  const feePercent = parseFloat(process.env.APPLICATION_FEE_PERCENT) || 10;
  return Math.round(amount * (feePercent / 100));
};

// Helper function to format amount for Stripe (convert to cents)
const formatAmountForStripe = (amount) => {
  return Math.round(amount * 100);
};

// Create Checkout Session
router.post('/create-checkout-session', async (req, res) => {
  try {
    const {
      items,
      customerEmail,
      connectedAccountId,
      successUrl,
      cancelUrl,
      metadata = {}
    } = req.body;

    // Validate required fields
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: { message: 'Items array is required and cannot be empty' }
      });
    }

    if (!customerEmail) {
      return res.status(400).json({
        error: { message: 'Customer email is required' }
      });
    }

    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    const applicationFeeAmount = calculateApplicationFee(subtotal);

    // Create line items for Stripe
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || 'Original watercolor artwork',
          images: item.imageUrl ? [item.imageUrl] : [],
          metadata: {
            productId: item.id
          }
        },
        unit_amount: formatAmountForStripe(item.price),
      },
      quantity: item.quantity || 1,
    }));

    // Session configuration
    const sessionConfig = {
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: successUrl || `${process.env.FRONTEND_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancelUrl || `${process.env.FRONTEND_URL}/checkout`,
      customer_email: customerEmail,
      metadata: {
        ...metadata,
        customerEmail,
        subtotal: subtotal.toString(),
        applicationFee: applicationFeeAmount.toString()
      },
      payment_intent_data: {
        metadata: {
          customerEmail,
          orderItems: JSON.stringify(items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1
          })))
        }
      }
    };

    // Add application fee and connected account if provided
    if (connectedAccountId && connectedAccountId !== 'acct_placeholder') {
      sessionConfig.payment_intent_data.application_fee_amount = formatAmountForStripe(applicationFeeAmount);
      sessionConfig.payment_intent_data.on_behalf_of = connectedAccountId;
      sessionConfig.payment_intent_data.transfer_data = {
        destination: connectedAccountId,
      };
    }

    // Create the session
    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.json({
      sessionId: session.id,
      url: session.url,
      clientSecret: session.client_secret,
      subtotal,
      applicationFee: applicationFeeAmount,
      total: subtotal
    });

  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'checkout_session_error'
      }
    });
  }
});

// Retrieve Checkout Session
router.get('/checkout-session/:sessionId', async (req, res) => {
  try {
    const { sessionId } = req.params;
    
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent']
    });

    res.json({
      session: {
        id: session.id,
        payment_status: session.payment_status,
        customer_email: session.customer_email,
        amount_total: session.amount_total,
        currency: session.currency,
        metadata: session.metadata,
        line_items: session.line_items,
        payment_intent: session.payment_intent
      }
    });

  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'session_retrieval_error'
      }
    });
  }
});

// Create Payment Intent (for custom payment flows)
router.post('/create-payment-intent', async (req, res) => {
  try {
    const {
      amount,
      currency = 'usd',
      customerEmail,
      connectedAccountId,
      metadata = {}
    } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        error: { message: 'Valid amount is required' }
      });
    }

    const applicationFeeAmount = calculateApplicationFee(amount);
    const stripeAmount = formatAmountForStripe(amount);

    const paymentIntentConfig = {
      amount: stripeAmount,
      currency,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        ...metadata,
        customerEmail,
        originalAmount: amount.toString(),
        applicationFee: applicationFeeAmount.toString()
      }
    };

    // Add application fee and connected account if provided
    if (connectedAccountId && connectedAccountId !== 'acct_placeholder') {
      paymentIntentConfig.application_fee_amount = formatAmountForStripe(applicationFeeAmount);
      paymentIntentConfig.on_behalf_of = connectedAccountId;
      paymentIntentConfig.transfer_data = {
        destination: connectedAccountId,
      };
    }

    const paymentIntent = await stripe.paymentIntents.create(paymentIntentConfig);

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount: amount,
      applicationFee: applicationFeeAmount
    });

  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'payment_intent_error'
      }
    });
  }
});

// Get Payment Intent
router.get('/payment-intent/:paymentIntentId', async (req, res) => {
  try {
    const { paymentIntentId } = req.params;
    
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    res.json({
      paymentIntent: {
        id: paymentIntent.id,
        status: paymentIntent.status,
        amount: paymentIntent.amount,
        currency: paymentIntent.currency,
        metadata: paymentIntent.metadata,
        charges: paymentIntent.charges
      }
    });

  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'payment_intent_retrieval_error'
      }
    });
  }
});

// Refund a payment
router.post('/refund', async (req, res) => {
  try {
    const { paymentIntentId, amount, reason = 'requested_by_customer' } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({
        error: { message: 'Payment Intent ID is required' }
      });
    }

    const refundConfig = {
      payment_intent: paymentIntentId,
      reason
    };

    if (amount) {
      refundConfig.amount = formatAmountForStripe(amount);
    }

    const refund = await stripe.refunds.create(refundConfig);

    res.json({
      refund: {
        id: refund.id,
        amount: refund.amount,
        currency: refund.currency,
        status: refund.status,
        reason: refund.reason
      }
    });

  } catch (error) {
    console.error('Error creating refund:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'refund_error'
      }
    });
  }
});

module.exports = router;