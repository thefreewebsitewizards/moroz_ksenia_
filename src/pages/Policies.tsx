import React from 'react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 lg:mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Store Policies
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 px-4">
            Everything you need to know about shopping with Moroz Art
          </p>
        </div>

        <div className="grid gap-8">
          {/* Payment Methods */}
          <div className="bg-white rounded-lg shadow-lg p-6 lg:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3 lg:mr-4">
                <i className="fas fa-credit-card text-white text-lg lg:text-xl"></i>
              </div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Payment Methods</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              <div className="text-center p-4 lg:p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <i className="fab fa-paypal text-white text-lg lg:text-2xl"></i>
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">PayPal</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Secure and convenient online payments</p>
              </div>
              <div className="text-center p-4 lg:p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <i className="fas fa-mobile-alt text-white text-lg lg:text-2xl"></i>
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Venmo</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Quick mobile payments</p>
              </div>
              <div className="text-center p-4 lg:p-6 border border-gray-200 rounded-lg">
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <i className="fas fa-university text-white text-lg lg:text-2xl"></i>
                </div>
                <h3 className="text-base lg:text-lg font-semibold text-gray-900 mb-2">Zelle</h3>
                <p className="text-gray-600 text-xs lg:text-sm">Direct bank transfers</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-800 text-sm">
                <i className="fas fa-info-circle mr-2"></i>
                All payments are processed securely. We're always open to suggestions for additional payment methods that would be more convenient for our customers.
              </p>
            </div>
          </div>

          {/* Shipping Rates & Delivery */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-shipping-fast text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Shipping Rates & Delivery</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Shipping Rates</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Small Flat Items</h4>
                      <p className="text-sm text-gray-600">(0–0.5 lb)</p>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">$6</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Medium Framed Items</h4>
                      <p className="text-sm text-gray-600">(up to 5 lb)</p>
                    </div>
                    <span className="text-lg font-semibold text-blue-600">$20</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-gray-900">Large / Original Art</h4>
                      <p className="text-sm text-gray-600">Calculated based on weight & zone</p>
                    </div>
                    <span className="text-sm font-medium text-gray-600">Variable</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <i className="fas fa-gift text-green-600 mr-3"></i>
                    <span className="text-green-800 font-medium">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <i className="fas fa-map-marker-alt text-blue-600 mr-3"></i>
                    <span className="text-blue-800 font-medium">Free local delivery within Phoenix, AZ</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Packaging & Delivery</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Packaging & Insurance</h4>
                    <p className="text-gray-600 text-sm">
                      All orders are carefully wrapped using rigid mailers with cardboard inserts or foam. 
                      Original artwork is shipped in a double-box with protective corners.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Delivery Time & Tracking</h4>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• USPS First Class: 3–7 business days (tracking included)</li>
                      <li>• Priority Mail: 2–4 business days</li>
                      <li>• Larger items: Delivery cost calculated based on weight and shipping zone; tracking provided</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 rounded-lg">
                    <p className="text-yellow-800 text-sm">
                      <i className="fas fa-clock mr-2"></i>
                      Orders are shipped from Phoenix, AZ. Please allow 3–5 business days for processing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Returns & Refunds Policy */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-shield-alt text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Returns & Refunds Policy</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="p-6 bg-red-50 rounded-lg mb-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-3">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    Important Notice
                  </h3>
                  <p className="text-red-700">
                    All sales of original artwork and custom commissions are final — no returns or refunds for these items.
                  </p>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Damaged Items</h3>
                <p className="text-gray-600 mb-4">
                  If an item arrives damaged, please contact me within 7 days of delivery with clear photos of the damage and packaging.
                </p>
                
                <h4 className="font-medium text-gray-900 mb-3">Possible Solutions:</h4>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <i className="fas fa-sync-alt text-blue-500 mr-2 mt-1"></i>
                    <span>Replacement (if available for prints or small items)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-undo text-green-500 mr-2 mt-1"></i>
                    <span>Full refund after the item is returned (buyer covers return shipping)</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-percentage text-orange-500 mr-2 mt-1"></i>
                    <span>Partial refund if the buyer wishes to keep the damaged item</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Important Notes</h3>
                <div className="space-y-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Color Variations</h4>
                    <p className="text-gray-600 text-sm">
                      Colors may vary slightly due to different screen settings. Refunds are not offered for minor color differences.
                    </p>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Order Cancellations</h4>
                    <p className="text-gray-600 text-sm">
                      Order cancellations are accepted within 24 hours, as long as the order has not yet shipped.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">Need Help?</h4>
                    <p className="text-blue-700 text-sm">
                      For any other concerns, please feel free to contact me — I'll do my best to help.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Store Policies Summary */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-store text-white text-xl"></i>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Additional Store Policies</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">International Orders</h3>
                  <p className="text-gray-600">
                    International buyers are responsible for any customs duties or import taxes.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
                  <p className="text-gray-600">
                    Each item is handmade, and slight variations from the photos may occur. 
                    Colors may appear slightly different due to screen settings.
                  </p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Copyright</h3>
                  <p className="text-gray-600">
                    All artworks remain the copyright of Ksenia Moroz. Purchasing a physical product 
                    does not grant reproduction or commercial rights.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Delivery Information</h3>
                  <p className="text-gray-600">
                    Delivery time varies by location (US orders usually 2–7 days via USPS). 
                    All orders include tracking information.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Questions About Our Policies?</h2>
              <p className="text-blue-100 mb-6">
                We're here to help! Don't hesitate to reach out if you have any questions about our policies or need assistance with your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Contact Us
                </a>
                <a href="mailto:info@morozart.com" className="border border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                  Email Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Policies;