import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createCheckoutSession } from '../services/stripe';
import { toast } from 'react-toastify';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!);

interface StripeCheckoutProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ onSuccess, onCancel }) => {
  const { items, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>('');

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setLoading(true);
    try {
      // Create checkout session without connected account for now
      // In a real implementation, connectedAccountId should come from the product/artist data
      const session = await createCheckoutSession({
        items,
        customerEmail: currentUser?.email || 'guest@example.com',
        // connectedAccountId: 'acct_placeholder', // Commented out to avoid transfer errors
        successUrl: `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart`,
      });

      if (session.url) {
        // Redirect to Stripe's hosted checkout page
        window.location.href = session.url;
      } else if (session.client_secret) {
        setClientSecret(session.client_secret);
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast.error('Failed to initialize checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      // Create a new checkout session and redirect to Stripe
      await handleCheckout();
    } catch (error) {
      console.error('Payment initialization failed:', error);
      toast.error('Failed to start payment process. Please try again.');
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">No items in cart</p>
      </div>
    );
  }

  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Processing...</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <span>Proceed to Checkout</span>
        </>
      )}
    </button>
  );
};

export default StripeCheckout;