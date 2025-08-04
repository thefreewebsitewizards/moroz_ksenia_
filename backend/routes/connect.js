const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

// Create Connected Account for Artist
router.post('/create-account', async (req, res) => {
  try {
    const {
      email,
      country = 'US',
      type = 'express',
      businessType = 'individual',
      metadata = {}
    } = req.body;

    if (!email) {
      return res.status(400).json({
        error: { message: 'Email is required' }
      });
    }

    // Create the connected account
    const account = await stripe.accounts.create({
      type,
      country,
      email,
      business_type: businessType,
      capabilities: {
        card_payments: { requested: true },
        transfers: { requested: true },
      },
      business_profile: {
        product_description: 'Original watercolor artwork and paintings',
        mcc: '5970', // Artist supplies and craft stores
        url: process.env.FRONTEND_URL
      },
      metadata: {
        ...metadata,
        platform: 'moroz-art',
        created_at: new Date().toISOString()
      }
    });

    res.json({
      accountId: account.id,
      email: account.email,
      country: account.country,
      type: account.type,
      charges_enabled: account.charges_enabled,
      payouts_enabled: account.payouts_enabled,
      details_submitted: account.details_submitted,
      requirements: account.requirements
    });

  } catch (error) {
    console.error('Error creating connected account:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'account_creation_error'
      }
    });
  }
});

// Create Account Link for Onboarding
router.post('/create-account-link', async (req, res) => {
  try {
    const { accountId, type = 'account_onboarding' } = req.body;

    if (!accountId) {
      return res.status(400).json({
        error: { message: 'Account ID is required' }
      });
    }

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.FRONTEND_URL}/artist/onboarding/refresh?account_id=${accountId}`,
      return_url: `${process.env.FRONTEND_URL}/artist/onboarding/complete?account_id=${accountId}`,
      type,
    });

    res.json({
      url: accountLink.url,
      expires_at: accountLink.expires_at
    });

  } catch (error) {
    console.error('Error creating account link:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'account_link_error'
      }
    });
  }
});

// Get Account Information
router.get('/account/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;

    const account = await stripe.accounts.retrieve(accountId);

    res.json({
      account: {
        id: account.id,
        email: account.email,
        country: account.country,
        type: account.type,
        charges_enabled: account.charges_enabled,
        payouts_enabled: account.payouts_enabled,
        details_submitted: account.details_submitted,
        requirements: account.requirements,
        business_profile: account.business_profile,
        capabilities: account.capabilities,
        metadata: account.metadata
      }
    });

  } catch (error) {
    console.error('Error retrieving account:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'account_retrieval_error'
      }
    });
  }
});

// Update Account Information
router.put('/account/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const updateData = req.body;

    // Filter allowed update fields
    const allowedFields = [
      'business_profile',
      'metadata',
      'settings'
    ];

    const filteredData = {};
    allowedFields.forEach(field => {
      if (updateData[field]) {
        filteredData[field] = updateData[field];
      }
    });

    const account = await stripe.accounts.update(accountId, filteredData);

    res.json({
      account: {
        id: account.id,
        business_profile: account.business_profile,
        metadata: account.metadata,
        settings: account.settings
      }
    });

  } catch (error) {
    console.error('Error updating account:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'account_update_error'
      }
    });
  }
});

// Create Login Link for Express Dashboard
router.post('/create-login-link', async (req, res) => {
  try {
    const { accountId } = req.body;

    if (!accountId) {
      return res.status(400).json({
        error: { message: 'Account ID is required' }
      });
    }

    const loginLink = await stripe.accounts.createLoginLink(accountId);

    res.json({
      url: loginLink.url
    });

  } catch (error) {
    console.error('Error creating login link:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'login_link_error'
      }
    });
  }
});

// Get Account Balance
router.get('/balance/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;

    const balance = await stripe.balance.retrieve({
      stripeAccount: accountId
    });

    res.json({
      balance: {
        available: balance.available,
        pending: balance.pending,
        connect_reserved: balance.connect_reserved,
        instant_available: balance.instant_available
      }
    });

  } catch (error) {
    console.error('Error retrieving balance:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'balance_retrieval_error'
      }
    });
  }
});

// Get Transfers for Account
router.get('/transfers/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { limit = 10, starting_after } = req.query;

    const transfersConfig = {
      destination: accountId,
      limit: parseInt(limit)
    };

    if (starting_after) {
      transfersConfig.starting_after = starting_after;
    }

    const transfers = await stripe.transfers.list(transfersConfig);

    res.json({
      transfers: transfers.data.map(transfer => ({
        id: transfer.id,
        amount: transfer.amount,
        currency: transfer.currency,
        created: transfer.created,
        description: transfer.description,
        metadata: transfer.metadata,
        source_transaction: transfer.source_transaction
      })),
      has_more: transfers.has_more
    });

  } catch (error) {
    console.error('Error retrieving transfers:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'transfers_retrieval_error'
      }
    });
  }
});

// Get Payouts for Account
router.get('/payouts/:accountId', async (req, res) => {
  try {
    const { accountId } = req.params;
    const { limit = 10, starting_after } = req.query;

    const payoutsConfig = {
      limit: parseInt(limit)
    };

    if (starting_after) {
      payoutsConfig.starting_after = starting_after;
    }

    const payouts = await stripe.payouts.list(payoutsConfig, {
      stripeAccount: accountId
    });

    res.json({
      payouts: payouts.data.map(payout => ({
        id: payout.id,
        amount: payout.amount,
        currency: payout.currency,
        arrival_date: payout.arrival_date,
        created: payout.created,
        description: payout.description,
        status: payout.status,
        type: payout.type,
        method: payout.method
      })),
      has_more: payouts.has_more
    });

  } catch (error) {
    console.error('Error retrieving payouts:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'payouts_retrieval_error'
      }
    });
  }
});

// Delete/Deactivate Account (for testing only)
router.delete('/account/:accountId', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({
        error: { message: 'Account deletion not allowed in production' }
      });
    }

    const { accountId } = req.params;

    const account = await stripe.accounts.del(accountId);

    res.json({
      deleted: account.deleted,
      id: account.id
    });

  } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({
      error: {
        message: error.message,
        type: 'account_deletion_error'
      }
    });
  }
});

module.exports = router;