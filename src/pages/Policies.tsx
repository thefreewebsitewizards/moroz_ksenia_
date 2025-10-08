import React from 'react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50 py-20 lg:py-24 relative overflow-hidden -mt-28" style={{paddingTop: '7rem'}}>
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200 to-orange-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-200 to-gray-200 rounded-full opacity-20 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gray-100 to-orange-100 rounded-full opacity-10 animate-spin" style={{animationDuration: '20s'}}></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full mb-6 shadow-lg">
            <i className="fas fa-file-contract text-white text-2xl"></i>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent mb-6">
            Store Policies
          </h1>
          <p className="text-xl lg:text-2xl text-[#4a5d4a] font-playfair max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about shopping with <span className="bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent font-semibold">Moroz Art</span>
          </p>
          <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#91a68a] to-[#cf955f] mx-auto rounded-full"></div>
        </div>

        <div className="grid gap-8 lg:gap-12">
          {/* Payment Methods */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                <i className="fas fa-credit-card text-white text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">Payment Methods</h2>
                <p className="text-[#4a5d4a] mt-1 font-open-sans">Secure and flexible payment options</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="group text-center p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-paypal text-white text-xl lg:text-2xl"></i>
                </div>
                <h3 className="text-lg lg:text-xl font-playfair font-bold text-[#4a5d4a] mb-3">PayPal</h3>
                <p className="text-[#6b7d6b] text-sm lg:text-base leading-relaxed font-open-sans">Secure and convenient online payments with buyer protection</p>
              </div>
              <div className="group text-center p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-mobile-alt text-white text-xl lg:text-2xl"></i>
                </div>
                <h3 className="text-lg lg:text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Venmo</h3>
                <p className="text-[#6b7d6b] text-sm lg:text-base leading-relaxed font-open-sans">Quick and easy mobile payments for US customers</p>
              </div>
              <div className="group text-center p-6 lg:p-8 bg-gradient-to-br from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mx-auto mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <i className="fas fa-university text-white text-xl lg:text-2xl"></i>
                </div>
                <h3 className="text-lg lg:text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Zelle</h3>
                <p className="text-[#6b7d6b] text-sm lg:text-base leading-relaxed font-open-sans">Direct bank transfers for instant payments</p>
              </div>
            </div>
            <div className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
              <p className="text-[#4a5d4a] text-sm lg:text-base flex items-start font-open-sans">
                <i className="fas fa-info-circle mr-3 mt-1 text-[#cf955f]"></i>
                <span>All payments are processed securely with industry-standard encryption. We're always open to suggestions for additional payment methods that would be more convenient for our customers.</span>
              </p>
            </div>
          </div>

          {/* Shipping Rates & Delivery */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                <i className="fas fa-shipping-fast text-white text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">Shipping Rates & Delivery</h2>
                <p className="text-[#4a5d4a] mt-1 font-open-sans">Fast and reliable shipping worldwide</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-6 flex items-center">
                  <i className="fas fa-calculator text-[#cf955f] mr-3"></i>
                  Shipping Rates
                </h3>
                <div className="space-y-4">
                  <div className="group flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300">
                    <div>
                      <h4 className="font-playfair font-bold text-[#4a5d4a] text-lg">Small Flat Items</h4>
                      <p className="text-sm text-[#6b7d6b] mt-1 font-open-sans">(0–0.5 lb) • Bookmarks, postcards</p>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">$6</span>
                  </div>
                  <div className="group flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300">
                    <div>
                      <h4 className="font-playfair font-bold text-[#4a5d4a] text-lg">Medium Framed Items</h4>
                      <p className="text-sm text-[#6b7d6b] mt-1 font-open-sans">(up to 5 lb) • Framed prints</p>
                    </div>
                    <span className="text-2xl font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">$20</span>
                  </div>
                  <div className="group flex justify-between items-center p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300">
                    <div>
                      <h4 className="font-playfair font-bold text-[#4a5d4a] text-lg">Large / Original Art</h4>
                      <p className="text-sm text-[#6b7d6b] mt-1 font-open-sans">Calculated based on weight & zone</p>
                    </div>
                    <span className="text-lg font-semibold text-[#6b7d6b] font-open-sans">Variable</span>
                  </div>
                </div>
                
                <div className="mt-8 space-y-4">
                  <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-gift text-white"></i>
                    </div>
                    <span className="text-[#4a5d4a] font-semibold font-open-sans">Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-map-marker-alt text-white"></i>
                    </div>
                    <span className="text-[#4a5d4a] font-semibold font-open-sans">Free local delivery within Phoenix, AZ</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-6 flex items-center">
                  <i className="fas fa-box text-[#cf955f] mr-3"></i>
                  Packaging & Delivery
                </h3>
                <div className="space-y-6">
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-shield-alt text-white text-sm"></i>
                      </div>
                      <h4 className="font-playfair font-bold text-[#4a5d4a] text-lg">Packaging & Insurance</h4>
                    </div>
                    <p className="text-[#6b7d6b] leading-relaxed ml-11 font-open-sans">
                      All orders are carefully wrapped using rigid mailers with cardboard inserts or foam. 
                      Original artwork is shipped in a double-box with protective corners for maximum safety.
                    </p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start mb-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-truck text-white text-sm"></i>
                      </div>
                      <h4 className="font-playfair font-bold text-[#4a5d4a] text-lg">Delivery Time & Tracking</h4>
                    </div>
                    <ul className="text-[#6b7d6b] space-y-2 ml-11 font-open-sans">
                      <li className="flex items-center">
                        <i className="fas fa-circle text-[#cf955f] text-xs mr-3"></i>
                        USPS First Class: 3–7 business days (tracking included)
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-circle text-[#cf955f] text-xs mr-3"></i>
                        Priority Mail: 2–4 business days
                      </li>
                      <li className="flex items-center">
                        <i className="fas fa-circle text-[#cf955f] text-xs mr-3"></i>
                        Larger items: Delivery cost calculated based on weight and shipping zone; tracking provided
                      </li>
                    </ul>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                    <div className="flex items-start">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-clock text-white text-sm"></i>
                      </div>
                      <div>
                        <h4 className="font-playfair font-bold text-[#4a5d4a] mb-2">Processing Time</h4>
                        <p className="text-[#6b7d6b] font-open-sans">
                          Orders are shipped from Phoenix, AZ. Please allow 3–5 business days for processing.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Returns & Refunds Policy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                <i className="fas fa-shield-alt text-white text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">Returns & Refunds Policy</h2>
                <p className="text-[#4a5d4a] mt-1 font-open-sans">Your satisfaction is our priority</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl mb-8">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-[#4a5d4a]">
                      Important Notice
                    </h3>
                  </div>
                  <p className="text-[#6b7d6b] leading-relaxed ml-13 font-open-sans">
                    All sales of original artwork and custom commissions are final — no returns or refunds for these items.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-6 flex items-center">
                    <i className="fas fa-tools text-[#cf955f] mr-3"></i>
                    Damaged Items
                  </h3>
                  <p className="text-[#6b7d6b] mb-6 leading-relaxed font-open-sans">
                    If an item arrives damaged, please contact me within 7 days of delivery with clear photos of the damage and packaging.
                  </p>
                  
                  <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Possible Solutions:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-sync-alt text-white text-sm"></i>
                      </div>
                      <span className="text-[#4a5d4a] font-medium font-open-sans">Replacement (if available for prints or small items)</span>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-undo text-white text-sm"></i>
                      </div>
                      <span className="text-[#4a5d4a] font-medium font-open-sans">Full refund after the item is returned (buyer covers return shipping)</span>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-percentage text-white text-sm"></i>
                      </div>
                      <span className="text-[#4a5d4a] font-medium font-open-sans">Partial refund if the buyer wishes to keep the damaged item</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-6 flex items-center">
                  <i className="fas fa-exchange-alt text-[#cf955f] mr-3"></i>
                  Returns & Exchanges
                </h3>
                <p className="text-[#6b7d6b] mb-6 leading-relaxed font-open-sans">
                  For non-original artwork (prints, bookmarks, postcards), I accept returns and exchanges within 14 days of delivery.
                </p>
                <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Return Conditions:</h4>
                <ul className="text-[#6b7d6b] space-y-3 mb-6 font-open-sans">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#cf955f] mr-3 mt-1"></i>
                    Items must be returned in their original condition and packaging.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#cf955f] mr-3 mt-1"></i>
                    Buyer is responsible for return shipping costs.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#cf955f] mr-3 mt-1"></i>
                    Refunds will be issued upon receipt and inspection of the returned item.
                  </li>
                </ul>
                <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Exchange Process:</h4>
                <p className="text-[#6b7d6b] mb-6 leading-relaxed font-open-sans">
                  If you wish to exchange an item, please contact me to arrange the details. 
                  New shipping charges may apply for the exchanged item.
                </p>
                <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Non-Returnable Items:</h4>
                <ul className="text-[#6b7d6b] space-y-3 font-open-sans">
                  <li className="flex items-start">
                    <i className="fas fa-times-circle text-[#cf955f] mr-3 mt-1"></i>
                    Original artwork and custom commissions.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle text-[#cf955f] mr-3 mt-1"></i>
                    Gift cards.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle text-[#cf955f] mr-3 mt-1"></i>
                    Digital downloads.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Additional Store Policies */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                <i className="fas fa-store text-white text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">Additional Store Policies</h2>
                <p className="text-[#4a5d4a] mt-1 font-open-sans">Important information for all customers</p>
              </div>
            </div>
            
            <div className="space-y-6 text-[#6b7d6b] font-open-sans">
              <p>
                <b>International Orders:</b> International buyers are responsible for any customs duties or import taxes that may apply.
              </p>
              <p>
                <b>Product Details:</b> Each item is handmade with care, and slight variations from the photos may occur. Colors may appear slightly different due to screen settings.
              </p>
              <p>
                <b>Copyright:</b> All artworks remain the copyright of Ksenia Moroz. Purchasing a physical product does not grant reproduction or commercial rights.
              </p>
              <p>
                <b>Delivery Information:</b> Delivery time varies by location (US orders usually 2–7 days via USPS). All orders include tracking information for your peace of mind.
              </p>
            </div>
          </div>


          {/* Privacy Policy */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                <i className="fas fa-user-shield text-white text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">Privacy Policy</h2>
                <p className="text-[#4a5d4a] mt-1 font-open-sans">Your data is safe with us</p>
              </div>
            </div>
            
            <div className="space-y-6 text-[#6b7d6b] font-open-sans">
              <p>
                I value your privacy and am committed to protecting your personal information. This policy outlines how I collect, use, and safeguard your data when you visit my website or make a purchase.
              </p>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Information I Collect:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <span className="font-medium">Personal Data:</span> When you make a purchase or sign up for my newsletter, I collect information such as your name, email address, shipping address, and payment details. This information is used solely for order fulfillment and communication.
                  </li>
                  <li>
                    <span className="font-medium">Usage Data:</span> I may collect non-personal information about your visit, including your IP address, browser type, pages viewed, and the time spent on my site. This helps me improve website functionality and user experience.
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">How I Use Your Information:</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To process and fulfill your orders.</li>
                  <li>To communicate with you about your purchases, inquiries, and promotions.</li>
                  <li>To improve my website, products, and services.</li>
                  <li>To send periodic newsletters (you can unsubscribe at any time).</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Data Sharing:</h3>
                <p>
                  I do not sell, trade, or otherwise transfer your personal information to outside parties, except as necessary to fulfill your order (e.g., shipping carriers, payment processors). I may also release information when its release is appropriate to comply with the law, enforce my site policies, or protect my or others' rights, property, or safety.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Data Security:</h3>
                <p>
                  I implement a variety of security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information. All sensitive/credit information is transmitted via Secure Socket Layer (SSL) technology and then encrypted into my payment gateway provider's database.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Cookies:</h3>
                <p>
                  My website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer's hard drive through your web browser (if you allow) that enables the site's or service provider's systems to recognize your browser and capture and remember certain information. You can choose to have your computer warn you each time a cookie is being sent, or you can choose to turn off all cookies via your browser settings.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Your Consent:</h3>
                <p>
                  By using my site, you consent to my privacy policy.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-3">Changes to This Policy:</h3>
                <p>
                  Any changes to my privacy policy will be posted on this page. This policy was last modified on October 26, 2023.
                </p>
              </div>
            </div>
          </div>

          {/* Terms of Service */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-2xl flex items-center justify-center mr-4 lg:mr-6 shadow-lg">
                <i className="fas fa-palette text-white text-xl lg:text-2xl"></i>
              </div>
              <div>
                <h2 className="text-2xl lg:text-3xl font-playfair font-bold bg-gradient-to-r from-[#91a68a] to-[#cf955f] bg-clip-text text-transparent">Terms of Service</h2>
                <p className="text-[#4a5d4a] mt-1 font-open-sans">Your satisfaction is our priority</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
              <div>
                <div className="p-6 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl mb-8">
                  <div className="flex items-start mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                      <i className="fas fa-exclamation-triangle text-white"></i>
                    </div>
                    <h3 className="text-xl font-playfair font-bold text-[#4a5d4a]">
                      Important Notice
                    </h3>
                  </div>
                  <p className="text-[#6b7d6b] leading-relaxed ml-13 font-open-sans">
                    All sales of original artwork and custom commissions are final — no returns or refunds for these items.
                  </p>
                </div>
                
                <div className="mb-8">
                  <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-6 flex items-center">
                    <i className="fas fa-tools text-[#cf955f] mr-3"></i>
                    Damaged Items
                  </h3>
                  <p className="text-[#6b7d6b] mb-6 leading-relaxed font-open-sans">
                    If an item arrives damaged, please contact me within 7 days of delivery with clear photos of the damage and packaging.
                  </p>
                  
                  <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Possible Solutions:</h4>
                  <div className="space-y-4">
                    <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-[#91a68a]">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-sync-alt text-white text-sm"></i>
                      </div>
                      <span className="text-[#4a5d4a] font-medium font-open-sans">Replacement (if available for prints or small items)</span>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-[#91a68a]">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-undo text-white text-sm"></i>
                      </div>
                      <span className="text-[#4a5d4a] font-medium font-open-sans">Full refund after the item is returned (buyer covers return shipping)</span>
                    </div>
                    <div className="flex items-start p-4 bg-gradient-to-r from-gray-50 to-orange-50 rounded-xl border border-[#91a68a]">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#91a68a] to-[#cf955f] rounded-full flex items-center justify-center mr-3 mt-1">
                        <i className="fas fa-percentage text-white text-sm"></i>
                      </div>
                      <span className="text-[#4a5d4a] font-medium font-open-sans">Partial refund if the buyer wishes to keep the damaged item</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-playfair font-bold text-[#4a5d4a] mb-6 flex items-center">
                  <i className="fas fa-exchange-alt text-[#cf955f] mr-3"></i>
                  Returns & Exchanges
                </h3>
                <p className="text-[#6b7d6b] mb-6 leading-relaxed font-open-sans">
                  For non-original artwork (prints, bookmarks, postcards), I accept returns and exchanges within 14 days of delivery.
                </p>
                <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Return Conditions:</h4>
                <ul className="text-[#6b7d6b] space-y-3 mb-6 font-open-sans">
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#cf955f] mr-3 mt-1"></i>
                    Items must be returned in their original condition and packaging.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#cf955f] mr-3 mt-1"></i>
                    Buyer is responsible for return shipping costs.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-check-circle text-[#cf955f] mr-3 mt-1"></i>
                    Refunds will be issued upon receipt and inspection of the returned item.
                  </li>
                </ul>
                <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Exchange Process:</h4>
                <p className="text-[#6b7d6b] mb-6 leading-relaxed font-open-sans">
                  If you wish to exchange an item, please contact me to arrange the details. 
                  New shipping charges may apply for the exchanged item.
                </p>
                <h4 className="font-playfair font-bold text-[#4a5d4a] mb-4 text-lg">Non-Returnable Items:</h4>
                <ul className="text-[#6b7d6b] space-y-3 font-open-sans">
                  <li className="flex items-start">
                    <i className="fas fa-times-circle text-[#cf955f] mr-3 mt-1"></i>
                    Original artwork and custom commissions.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle text-[#cf955f] mr-3 mt-1"></i>
                    Gift cards.
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-times-circle text-[#cf955f] mr-3 mt-1"></i>
                    Digital downloads.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r font-playfair from-[#91a68a] to-[#cf955f] rounded-[100px] shadow-lg p-8 text-white">
            <div className="text-center">
              <h2 className="text-2xl font-playfair text-white font-bold mb-4">Questions About Our Policies?</h2>
              <p className="text-orange-100 mb-6">
                We're here to help! Don't hesitate to reach out if you have any questions about our policies or need assistance with your order.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/contact" className="bg-white text-[#91a68a] px-6 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                  Contact Us
                </a>
                <a href="mailto:info@morozart.com" className="border border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#91a68a] transition-colors">
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