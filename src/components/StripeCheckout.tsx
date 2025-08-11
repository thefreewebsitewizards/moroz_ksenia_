import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createCheckoutSession } from '../services/stripe';
import { toast } from 'react-toastify';
import { ShippingRate } from '../services/clientShipping';

interface StripeCheckoutProps {
  onSuccess?: () => void;
  onCancel?: () => void;
  connectedAccountId?: string;
  selectedShippingRate?: ShippingRate | null;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  onSuccess, 
  onCancel, 
  connectedAccountId,
  selectedShippingRate
}) => {
  const { items, total } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    
    // Validate shipping rate selection
    if (!selectedShippingRate) {
      toast.error('Please select a shipping option before proceeding to checkout.');
      return;
    }

    const accountId = connectedAccountId || process.env.REACT_APP_STRIPE_CONNECTED_ACCOUNT_ID;
    if (!accountId) {
      toast.error('Stripe account configuration is missing. Please contact support.');
      return;
    }

    setLoading(true);
    try {
      const session = await createCheckoutSession({
        items,
        customerEmail: currentUser?.email || 'guest@example.com',
        userId: currentUser?.uid,
        connectedAccountId: accountId,
        successUrl: `${window.location.origin}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/cart`,
        useStripeShipping: false, // We're handling shipping selection in the cart
        selectedShippingRateId: selectedShippingRate?.id
      });

      console.log('Checkout session created:', {
        subtotal: session.subtotal,
        shipping: session.shippingCost,
        total: session.orderTotal,
        platformFee: session.applicationFee,
        freeShipping: session.freeShipping,
        useStripeShipping: session.useStripeShipping,
        shippingBreakdown: session.shippingBreakdown
      });

      if (session.url) {
        // Redirect to Stripe's hosted checkout page
        window.location.href = session.url;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      
      // More specific error handling
      let errorMessage = 'Failed to initialize checkout. Please try again.';
      if (error instanceof Error) {
        if (error.message.includes('shipping rate')) {
          errorMessage = 'Shipping configuration error. Please contact support.';
        } else if (error.message.includes('connected account')) {
          errorMessage = 'Payment processing setup error. Please contact support.';
        } else if (error.message.includes('network') || error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        }
      }
      
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    // Check if user is authenticated before proceeding to checkout
    if (!currentUser) {
      toast.info('Please sign in to complete your purchase');
      // Store current cart state and redirect to login
      navigate('/login', { state: { from: '/cart', message: 'Please sign in to complete your purchase' } });
      return;
    }

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

  const isCheckoutDisabled = loading || !selectedShippingRate;

  return (
    <div className="space-y-4">
      {/* Checkout Button */}
      <button
        onClick={handlePayment}
        disabled={isCheckoutDisabled}
        className={`w-full font-patrick-hand-sc font-bold py-4 px-6 rounded-full transition-all duration-300 flex items-center justify-center space-x-3 ${
          isCheckoutDisabled
            ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white hover:shadow-lg transform hover:scale-[1.02]'
        }`}
      >
        {loading ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing...</span>
          </>
        ) : !selectedShippingRate ? (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <span>Select Shipping Option</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span>Proceed to Secure Checkout</span>
          </>
        )}
      </button>

      {/* Security Info */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-sm text-slate-600">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          <span className="font-patrick-hand">Secure payment by Stripe</span>
        </div>
        <p className="font-patrick-hand text-xs text-slate-500 mt-1">
          SSL encrypted • PCI compliant • Platform fee included
        </p>
      </div>
    </div>
  );
};

export default StripeCheckout;