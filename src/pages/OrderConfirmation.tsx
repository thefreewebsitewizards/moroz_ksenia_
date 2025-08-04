import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { getCheckoutSession } from '../services/stripe';
import { toast } from 'react-toastify';

interface OrderConfirmationProps {}

const OrderConfirmation: React.FC<OrderConfirmationProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);

  useEffect(() => {
    const handleOrderConfirmation = async () => {
      // Get session ID from URL parameters
      const urlParams = new URLSearchParams(location.search);
      const sessionId = urlParams.get('session_id');
      
      if (sessionId) {
        try {
          // Verify the payment with Stripe
          const session = await getCheckoutSession(sessionId);
          
          if (session.payment_status === 'paid') {
            setOrderId(sessionId);
            // Clear the cart after successful payment
            clearCart();
            toast.success('🎉 Payment successful! Your order has been confirmed.');
          } else {
            toast.error('Payment verification failed. Please contact support.');
            navigate('/cart');
          }
        } catch (error) {
          console.error('Error verifying payment:', error);
          toast.error('Unable to verify payment. Please contact support.');
          navigate('/cart');
        }
      } else {
        // Check for order ID from navigation state (fallback)
        const orderIdFromState = location.state?.orderId;
        
        if (orderIdFromState) {
          setOrderId(orderIdFromState);
          clearCart();
        } else {
          // If no session ID or order ID, redirect to home
          navigate('/');
        }
      }
    };
    
    handleOrderConfirmation();
  }, [location.search, location.state, navigate, clearCart]);

  if (!orderId) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          {/* Success Icon */}
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
            <svg
              className="h-8 w-8 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Payment Successful!
          </h1>
          
          <p className="text-lg text-neutral-600 mb-2">
            Thank you for your purchase. Your order has been confirmed.
          </p>
          
          <p className="text-sm text-neutral-500 mb-8">
            Order ID: <span className="font-mono font-medium">{orderId}</span>
          </p>

          {/* Order Details */}
          <div className="bg-neutral-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">
              What happens next?
            </h2>
            
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">1</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Order Confirmation</p>
                  <p className="text-xs text-neutral-600">You'll receive an email confirmation shortly</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">2</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Processing</p>
                  <p className="text-xs text-neutral-600">We'll prepare your artwork for shipping</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                  <span className="text-xs font-medium text-blue-600">3</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-neutral-900">Shipping</p>
                  <p className="text-xs text-neutral-600">You'll receive tracking information when shipped</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stripe Connect Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
            <div className="flex items-center justify-center space-x-2 text-blue-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Secure payment processed by Stripe</span>
            </div>
            <p className="text-xs text-blue-600 mt-1 text-center">
              Platform fee (10%) included • Funds distributed to artist
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-neutral-900 hover:bg-neutral-800 transition-colors"
            >
              Continue Shopping
            </Link>
            
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-300 text-base font-medium rounded-lg text-neutral-700 bg-white hover:bg-neutral-50 transition-colors"
            >
              Print Receipt
            </button>
          </div>

          {/* Support */}
          <div className="mt-8 pt-6 border-t border-neutral-200">
            <p className="text-sm text-neutral-500">
              Need help? Contact us at{' '}
              <a href="mailto:support@moroz-art.com" className="text-blue-600 hover:text-blue-500">
                support@moroz-art.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;