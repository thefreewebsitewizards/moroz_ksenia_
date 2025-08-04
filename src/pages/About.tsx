import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-gray-900 mb-4 lg:mb-6 px-4">
            About Moroz Custom Art
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
            Welcome to my world of watercolor art! I'm passionate about creating unique, handmade pieces that capture the beauty of nature and landscapes.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-12 lg:mb-16">
          {/* Artist Image */}
          <div className="relative order-2 lg:order-1">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img 
                src="/Moroz.jpg" 
                alt="Ksenia Moroz - Watercolor Artist" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-2 -right-2 lg:-bottom-4 lg:-right-4 w-20 h-20 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
          </div>

          {/* Artist Story */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 lg:p-8 shadow-lg border border-white/20">
              <h2 className="text-2xl lg:text-3xl font-playfair font-bold text-gray-900 mb-4 lg:mb-6 flex items-center">
                <i className="fas fa-palette text-purple-500 mr-3"></i>
                My Artistic Journey
              </h2>
              <p className="text-gray-700 mb-4 leading-relaxed">
                Each artwork is carefully crafted using high-quality watercolor paints and professional paper. 
                Based in Phoenix, Arizona, I draw inspiration from the stunning desert landscapes, national parks, 
                and natural wonders of the Southwest.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Every piece is original and one-of-a-kind, capturing the essence of nature's beauty through 
                the delicate medium of watercolor.
              </p>
            </div>

            {/* Mission Statement */}
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-6 border-l-4 border-purple-500">
              <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                <i className="fas fa-heart text-red-500 mr-2"></i>
                Giving Back
              </h3>
              <p className="text-gray-700">
                5% of all sales are donated to the Breast Cancer Fund, supporting research and awareness.
              </p>
            </div>
          </div>
        </div>

        {/* Products & Pricing */}
        <div className="mb-16">
          <h2 className="text-4xl font-playfair font-bold text-center text-gray-900 mb-12">
            Art for Sale
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Bookmarks */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-bookmark text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">📚 Bookmarks</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">$15</p>
              <p className="text-gray-600">Beautiful watercolor bookmarks perfect for book lovers</p>
            </div>

            {/* Postcards */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-mail-bulk text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">🏞️ Postcards</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">$20</p>
              <p className="text-gray-600">Handmade postcards featuring desert landscapes</p>
            </div>

            {/* Wall Art */}
            <div className="bg-white rounded-xl shadow-lg p-8 text-center transform hover:scale-105 transition-all duration-300 hover:shadow-xl">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-image text-white text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">🖼️ Wall Art</h3>
              <p className="text-3xl font-bold text-purple-600 mb-4">Starting $40</p>
              <p className="text-gray-600">Original watercolor paintings for your home</p>
            </div>
          </div>
        </div>

        {/* Shipping & Social */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Shipping Info */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-shipping-fast text-blue-500 mr-3"></i>
              Shipping Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                <i className="fas fa-flag-usa text-blue-600 mr-3 text-xl"></i>
                <div>
                  <p className="font-semibold text-gray-900">📦 U.S. Shipping Available</p>
                  <p className="text-gray-600 text-sm">Fast and secure delivery nationwide</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-green-50 rounded-lg">
                <i className="fas fa-hand-holding-heart text-green-600 mr-3 text-xl"></i>
                <div>
                  <p className="font-semibold text-gray-900">Handmade Gifts</p>
                  <p className="text-gray-600 text-sm">Perfect for special occasions and loved ones</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <i className="fas fa-share-alt text-purple-500 mr-3"></i>
              Follow My Journey
            </h3>
            <div className="space-y-4">
              <a 
                href="https://www.instagram.com/moroz_customart/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg hover:from-pink-100 hover:to-purple-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-instagram text-white text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Instagram</p>
                  <p className="text-gray-600 text-sm">@moroz_customart</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-400 ml-auto group-hover:text-purple-500 transition-colors duration-300"></i>
              </a>
              
              <a 
                href="https://www.youtube.com/@moroz_customart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg hover:from-red-100 hover:to-pink-100 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <i className="fab fa-youtube text-white text-xl"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">YouTube</p>
                  <p className="text-gray-600 text-sm">@moroz_customart</p>
                </div>
                <i className="fas fa-external-link-alt text-gray-400 ml-auto group-hover:text-red-500 transition-colors duration-300"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-playfair font-bold mb-4">
            Ready to Add Beauty to Your Space?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Explore our collection of unique watercolor artworks
          </p>
          <a 
            href="/gallery" 
            className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <i className="fas fa-palette mr-2"></i>
            Browse Gallery
            <i className="fas fa-arrow-right ml-2"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;