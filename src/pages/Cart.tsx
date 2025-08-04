import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { createOrder } from '../services/firebase';
import StripeCheckout from '../components/StripeCheckout';

const Cart: React.FC = () => {
  const { items, total, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleStripeSuccess = async () => {
    try {
      const orderData = {
        userId: currentUser?.uid || 'guest',
        items: items,
        total: total,
        status: 'paid' as const,
        paymentMethod: 'stripe'
      };

      const orderId = await createOrder(orderData);
      
      if (orderId) {
        toast.success('🎉 Payment successful! Your order has been placed.');
        clearCart();
        navigate('/order-confirmation', { state: { orderId } });
      } else {
        toast.error('❌ Failed to save order details. Please contact support.');
      }
    } catch (error) {
      console.error('Error saving order:', error);
      toast.error('❌ Failed to save order details. Please contact support.');
    }
  };

  const handleStripeCancel = () => {
    toast.info('Payment cancelled. Your items are still in your cart.');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 11-4 0v-6m4 0V9a2 2 0 10-4 0v4.01" />
              </svg>
            </div>
            <h2 className="font-playfair text-3xl font-bold text-neutral-900 mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-lg text-neutral-600 mb-8">
              Looks like you haven't added any artworks to your cart yet.
            </p>
            <Link
              to="/gallery"
              className="btn-primary inline-flex items-center"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-neutral-900">
            Your Cart
          </h1>
          <button
            onClick={clearCart}
            className="btn-secondary text-sm"
          >
            Clear Cart
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Your Items ({items.length})
                </h2>
                
                {/* Cart Items Grid - Simplified Layout */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col sm:grid sm:grid-cols-3 gap-4 p-4 border border-neutral-200 rounded-lg hover:shadow-md transition-shadow">
                      {/* Mobile Layout */}
                      <div className="flex gap-4 sm:contents">
                        {/* Product Image */}
                        <div className="w-20 h-20 sm:w-full sm:h-auto sm:aspect-square overflow-hidden rounded-lg bg-neutral-100 flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Product Info - Mobile */}
                        <div className="flex-1 sm:hidden">
                          <h3 className="font-playfair text-base font-semibold text-neutral-900 mb-2">
                            {item.name}
                          </h3>
                          <span className="text-lg font-bold text-primary-600">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                      
                      {/* Desktop Layout */}
                      {/* Product Name - Desktop */}
                      <div className="hidden sm:flex items-center">
                        <h3 className="font-playfair text-lg font-semibold text-neutral-900">
                          {item.name}
                        </h3>
                      </div>
                      
                      {/* Product Price - Desktop */}
                      <div className="hidden sm:flex items-center justify-end">
                        <span className="text-xl font-bold text-primary-600">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-neutral-200 lg:sticky lg:top-8">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Order Summary
                </h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-neutral-600">
                    <span>Subtotal ({items.length} items)</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-neutral-600">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="border-t border-neutral-200 pt-4">
                    <div className="flex justify-between text-lg font-semibold text-neutral-900">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <StripeCheckout 
                    onSuccess={handleStripeSuccess}
                    onCancel={handleStripeCancel}
                  />
                  <Link
                    to="/gallery"
                    className="w-full btn-secondary text-center block"
                  >
                    Continue Shopping
                  </Link>
                </div>

                {/* Security Badge */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center justify-center space-x-2 text-sm text-neutral-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <span>Secure Checkout</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Responsive Note */}
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <div className="flex items-start space-x-3">
            <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <h3 className="font-semibold text-primary-900 mb-1">
                Free Shipping
              </h3>
              <p className="text-sm text-primary-700">
                We offer free shipping on all orders. Your artwork will be carefully packaged and delivered to your door.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;