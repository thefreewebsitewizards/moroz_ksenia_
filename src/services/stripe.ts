// Stripe Connect integration with Firebase Functions
// This file handles all Stripe-related operations through Firebase Functions

import { CartItem } from './firebase';
import { formatAmountForStripe, calculateApplicationFee } from '../config/stripe';

// Firebase Functions URLs - Temporarily hardcoded for testing
const API_BASE_URL = 'http://127.0.0.1:5001/ksenia-munoz/us-central1';
const CHECKOUT_SESSION_URL = `${API_BASE_URL}/createCheckoutSessionV2`;
const GET_SESSION_URL = `${API_BASE_URL}/getCheckoutSessionV2`;

// Debug logging
console.log('🔧 Stripe service configuration:', {
  REACT_APP_FIREBASE_FUNCTIONS_URL: process.env.REACT_APP_FIREBASE_FUNCTIONS_URL,
  API_BASE_URL,
  GET_SESSION_URL
});

// Types for Stripe integration
export interface CheckoutSessionData {
  items: CartItem[];
  customerEmail?: string;
  userId?: string;
  connectedAccountId: string; // Required - no local testing support
  successUrl: string;
  cancelUrl: string;
  useStripeShipping?: boolean;
  selectedShippingRateId?: string; // ID of the pre-selected shipping rate
  shippingAddress?: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
}

export interface StripeCheckoutSession {
  id: string;
  url?: string;
  client_secret?: string;
  subtotal: number;
  shippingCost: number;
  orderTotal: number;
  applicationFee: number;
  platformFeePercent: number;
  freeShipping: boolean;
  useStripeShipping?: boolean;
  shippingBreakdown: {
    actualCost: number;
    markup: number;
    total: number;
  };
}

// Create a Stripe Checkout Session through Firebase Functions
export const createCheckoutSession = async (data: CheckoutSessionData): Promise<StripeCheckoutSession> => {
  try {
    const response = await fetch(CHECKOUT_SESSION_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: data.items.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || 'Original watercolor artwork',
          price: item.price,
          quantity: item.quantity || 1,
          imageUrl: item.imageUrl
        })),
        customerEmail: data.customerEmail,
        ...(data.userId && { userId: data.userId }),
        connectedAccountId: data.connectedAccountId,
        useStripeShipping: data.useStripeShipping !== false,
        ...(data.selectedShippingRateId && { selectedShippingRateId: data.selectedShippingRateId }),
        successUrl: data.successUrl,
        cancelUrl: data.cancelUrl,
        metadata: {
          source: 'moroz-art-frontend',
          timestamp: new Date().toISOString()
        }
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.error('Failed to parse error response:', parseError);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const errorMessage = errorData.error?.message || `Failed to create checkout session (${response.status})`;
      console.error('Checkout session creation failed:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      
      throw new Error(errorMessage);
    }

    const result = await response.json();
    
    return {
      id: result.sessionId,
      client_secret: result.clientSecret,
      url: result.url,
      subtotal: result.subtotal,
      shippingCost: result.shippingCost,
      orderTotal: result.orderTotal,
      applicationFee: result.applicationFee,
      platformFeePercent: result.platformFeePercent,
      freeShipping: result.freeShipping,
      shippingBreakdown: result.shippingBreakdown
    };
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Function to retrieve checkout session status
export const getCheckoutSession = async (sessionId: string): Promise<any> => {
  try {
    const response = await fetch(`${GET_SESSION_URL}?sessionId=${encodeURIComponent(sessionId)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to retrieve checkout session');
    }

    const result = await response.json();
    return result.session;
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    throw error;
  }
};

// Helper function to create a payment intent for custom payment flows
export const createPaymentIntent = async (data: CheckoutSessionData): Promise<any> => {
  try {
    const totalAmount = data.items.reduce((sum, item) => sum + item.price, 0);
    
    const response = await fetch(`${API_BASE_URL}/createPaymentIntent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: totalAmount,
        currency: 'usd',
        customerEmail: data.customerEmail,
        connectedAccountId: data.connectedAccountId,
        metadata: {
          orderItems: JSON.stringify(data.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity || 1
          }))),
          customerEmail: data.customerEmail,
          source: 'moroz-art-frontend'
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to create payment intent');
    }

    const result = await response.json();
    return {
      id: result.paymentIntentId,
      client_secret: result.clientSecret,
      amount: result.amount,
      application_fee_amount: result.applicationFee
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
};

// Function to get payment intent status
export const getPaymentIntent = async (paymentIntentId: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/getPaymentIntent/${paymentIntentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to retrieve payment intent');
    }

    const result = await response.json();
    return result.paymentIntent;
  } catch (error) {
    console.error('Error retrieving payment intent:', error);
    throw error;
  }
};

// Function to create a refund
export const createRefund = async (paymentIntentId: string, amount?: number, reason?: string): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/createRefund`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        paymentIntentId,
        amount,
        reason: reason || 'requested_by_customer'
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Failed to create refund');
    }

    const result = await response.json();
    return result.refund;
  } catch (error) {
    console.error('Error creating refund:', error);
    throw error;
  }
};