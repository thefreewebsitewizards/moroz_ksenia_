import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-blue-50 to-accent-50 relative overflow-hidden -mt-28" style={{paddingTop: '1rem'}}>
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-30 animate-float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-40 animate-float-delayed"></div>
        <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-accent-200 to-primary-200 rounded-full opacity-25 animate-float"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-primary-200 to-accent-200 rounded-full opacity-35 animate-float-delayed"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 lg:mb-20 pt-16 lg:pt-20">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-400 to-accent-400 text-white text-sm font-medium tracking-wide uppercase rounded-full shadow-lg font-open-sans">
              <i className="fas fa-palette mr-2"></i>
              Watercolor Artist
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-primary-800 mb-6 lg:mb-8 leading-tight">
            About <span className="bg-gradient-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">Moroz</span> Custom Art
          </h1>
          <p className="text-xl lg:text-2xl text-primary-700 max-w-4xl mx-auto leading-relaxed font-lora">
            Welcome to my world of watercolor art! I'm passionate about creating unique, handmade pieces that capture the beauty of nature and landscapes.
          </p>
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16 lg:mb-20">
          {/* Artist Image */}
          <div className="relative order-2 lg:order-1 group">
            <div className="relative">
              {/* Main image container */}
              <div className="relative overflow-hidden rounded-3xl shadow-2xl transform group-hover:scale-[1.02] transition-all duration-500">
                <img 
                  src="/Moroz.jpg" 
                  alt="Ksenia Moroz - Watercolor Artist" 
                  className="w-full h-[40rem] object-cover"
                  style={{
                    borderTopLeftRadius: '80px',
                    borderBottomRightRadius: '80px'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                {/* Artist name overlay */}
                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-sm font-medium opacity-90">Artist</p>
                  <p className="text-xl font-bold">Ksenia Moroz</p>
                </div>
              </div>
              
              {/* Floating badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg border-4 border-purple-100 group-hover:rotate-12 transition-transform duration-300">
                <i className="fas fa-paintbrush text-purple-500 text-xl"></i>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-20 h-20 lg:w-28 lg:h-28 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
              
              {/* Artistic frame effect */}
              <div className="absolute inset-0 rounded-3xl border-2 border-white/20 pointer-events-none"></div>
            </div>
          </div>

          {/* Artist Story */}
          <div className="space-y-8 order-1 lg:order-2">
            {/* Main story card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 lg:p-10 shadow-xl border border-white/30 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-accent-400 rounded-xl flex items-center justify-center mr-4">
                  <i className="fas fa-palette text-white text-xl"></i>
                </div>
                <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-primary-800">
                  My Artistic Journey
                </h2>
              </div>
              
              <div className="space-y-6">
                <p className="text-primary-700 text-lg leading-relaxed font-lora">
                  Each artwork is carefully crafted using high-quality watercolor paints and professional paper. 
                  Based in <span className="font-semibold text-primary-600">Phoenix, Arizona</span>, I draw inspiration from the stunning desert landscapes, national parks, 
                  and natural wonders of the Southwest.
                </p>
                <p className="text-primary-700 text-lg leading-relaxed font-lora">
                  Every piece is <span className="font-semibold text-accent-500">original and one-of-a-kind</span>, capturing the essence of nature's beauty through 
                  the delicate medium of watercolor.
                </p>
                
                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t" style={{ borderColor: '#91a68a' }}>
                  <div className="text-center">
                    <div 
                      className="text-3xl font-playfair font-bold mb-1"
                      style={{ 
                        background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      100+
                    </div>
                    <div className="text-sm font-open-sans" style={{ color: '#4a5d4a' }}>Artworks Created</div>
                  </div>
                  <div className="text-center">
                    <div 
                      className="text-3xl font-playfair font-bold mb-1"
                      style={{ 
                        background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}
                    >
                      5+
                    </div>
                    <div className="text-sm font-open-sans" style={{ color: '#4a5d4a' }}>Years of Experience</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mission Statement */}
            <div className="relative overflow-hidden rounded-2xl p-8 text-white shadow-xl" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
              
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mr-3">
                    <i className="fas fa-heart text-white text-lg"></i>
                  </div>
                  <h3 className="text-2xl font-playfair font-bold">
                    Giving Back
                  </h3>
                </div>
                <p className="text-white/90 text-lg leading-relaxed font-open-sans">
                  <span className="font-semibold">5% of all sales</span> are donated to the Breast Cancer Fund, supporting research and awareness.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products & Pricing */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6" style={{ color: '#4a5d4a' }}>
              Art for Sale
            </h2>
            <p className="text-xl font-lora max-w-2xl mx-auto" style={{ color: '#6b7d6b' }}>
              Discover unique watercolor pieces that bring nature's beauty into your space
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
            {/* Bookmarks */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{ border: '1px solid rgba(145, 166, 138, 0.1)' }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.05) 0%, rgba(207, 149, 95, 0.05) 100%)' }}></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fas fa-bookmark text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-2" style={{ color: '#4a5d4a' }}>📚 Bookmarks</h3>
                <div className="mb-4">
                  <span 
                    className="text-4xl font-playfair font-bold"
                    style={{ 
                      background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    $15
                  </span>
                </div>
                <p className="font-open-sans leading-relaxed mb-6" style={{ color: '#6b7d6b' }}>Beautiful watercolor bookmarks perfect for book lovers and reading enthusiasts</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <i className="fas fa-check" style={{ color: '#91a68a' }}></i>
                  <span className="font-open-sans" style={{ color: '#6b7d6b' }}>Handmade & Unique</span>
                </div>
              </div>
            </div>

            {/* Postcards */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{ border: '1px solid rgba(145, 166, 138, 0.1)' }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.05) 0%, rgba(207, 149, 95, 0.05) 100%)' }}></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fas fa-mail-bulk text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-2" style={{ color: '#4a5d4a' }}>🏞️ Postcards</h3>
                <div className="mb-4">
                  <span 
                    className="text-4xl font-playfair font-bold"
                    style={{ 
                      background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    $20
                  </span>
                </div>
                <p className="font-open-sans leading-relaxed mb-6" style={{ color: '#6b7d6b' }}>Handmade postcards featuring stunning desert landscapes and natural scenes</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <i className="fas fa-check" style={{ color: '#91a68a' }}></i>
                  <span className="font-open-sans" style={{ color: '#6b7d6b' }}>Desert Inspired</span>
                </div>
              </div>
            </div>

            {/* Wall Art */}
            <div className="group relative bg-white rounded-2xl shadow-xl p-8 text-center transform hover:scale-105 transition-all duration-500 hover:shadow-2xl" style={{ border: '1px solid rgba(145, 166, 138, 0.1)' }}>
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.05) 0%, rgba(207, 149, 95, 0.05) 100%)' }}></div>
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:rotate-12 transition-transform duration-300 shadow-lg" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fas fa-image text-white text-2xl"></i>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-2" style={{ color: '#4a5d4a' }}>🖼️ Wall Art</h3>
                <div className="mb-4">
                  <span className="text-2xl font-open-sans" style={{ color: '#6b7d6b' }}>Starting</span>
                  <span 
                    className="text-4xl font-playfair font-bold ml-2"
                    style={{ 
                      background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    $40
                  </span>
                </div>
                <p className="font-open-sans leading-relaxed mb-6" style={{ color: '#6b7d6b' }}>Original watercolor paintings that transform any space into an art gallery</p>
                <div className="flex items-center justify-center space-x-2 text-sm">
                  <i className="fas fa-check" style={{ color: '#91a68a' }}></i>
                  <span className="font-open-sans" style={{ color: '#6b7d6b' }}>Original Artwork</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Shipping & Social */}
        <div className="grid md:grid-cols-2 gap-10 lg:gap-12 mb-20">
          {/* Shipping Info */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 border border-white/30 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                <i className="fas fa-shipping-fast text-white text-xl"></i>
              </div>
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold" style={{ color: '#4a5d4a' }}>
                Shipping Information
              </h3>
            </div>
            
            <div className="space-y-6">
              <div className="group flex items-start p-6 rounded-xl hover:shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.1) 0%, rgba(207, 149, 95, 0.1) 100%)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fas fa-flag-usa text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="font-playfair font-bold text-lg mb-1" style={{ color: '#4a5d4a' }}>📦 U.S. Shipping Available</p>
                  <p className="font-open-sans" style={{ color: '#6b7d6b' }}>Fast and secure delivery nationwide with tracking</p>
                </div>
              </div>
              
              <div className="group flex items-start p-6 rounded-xl hover:shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.1) 0%, rgba(207, 149, 95, 0.1) 100%)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fas fa-hand-holding-heart text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="font-playfair font-bold text-lg mb-1" style={{ color: '#4a5d4a' }}>🎁 Perfect Gifts</p>
                  <p className="font-open-sans" style={{ color: '#6b7d6b' }}>Handmade with love for special occasions and loved ones</p>
                </div>
              </div>
              
              <div className="group flex items-start p-6 rounded-xl hover:shadow-lg transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.1) 0%, rgba(207, 149, 95, 0.1) 100%)' }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fas fa-shield-alt text-white text-lg"></i>
                </div>
                <div className="flex-1">
                  <p className="font-playfair font-bold text-lg mb-1" style={{ color: '#4a5d4a' }}>🛡️ Secure Packaging</p>
                  <p className="font-open-sans" style={{ color: '#6b7d6b' }}>Carefully packaged to ensure your art arrives safely</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 lg:p-10 border border-white/30 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center mb-8">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mr-4" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                <i className="fas fa-share-alt text-white text-xl"></i>
              </div>
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold" style={{ color: '#4a5d4a' }}>
                Follow My Journey
              </h3>
            </div>
            
            <div className="space-y-6">
              <a 
                href="https://www.instagram.com/moroz_customart/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.1) 0%, rgba(207, 149, 95, 0.1) 100%)' }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fab fa-instagram text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-playfair font-bold text-lg" style={{ color: '#4a5d4a' }}>Instagram</p>
                  <p className="font-open-sans" style={{ color: '#6b7d6b' }}>@moroz_customart • Follow for daily art updates</p>
                </div>
                <i className="fas fa-external-link-alt group-hover:scale-110 transition-all duration-300 text-lg" style={{ color: '#cf955f' }}></i>
              </a>
              
              <a 
                href="https://www.youtube.com/@moroz_customart" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                style={{ background: 'linear-gradient(135deg, rgba(145, 166, 138, 0.1) 0%, rgba(207, 149, 95, 0.1) 100%)' }}
              >
                <div className="w-14 h-14 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300 shadow-lg" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
                  <i className="fab fa-youtube text-white text-xl"></i>
                </div>
                <div className="flex-1">
                  <p className="font-playfair font-bold text-lg" style={{ color: '#4a5d4a' }}>YouTube</p>
                  <p className="font-open-sans" style={{ color: '#6b7d6b' }}>@moroz_customart • Watch painting tutorials</p>
                </div>
                <i className="fas fa-external-link-alt group-hover:scale-110 transition-all duration-300 text-lg" style={{ color: '#cf955f' }}></i>
              </a>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="relative overflow-hidden rounded-[300px] p-12 lg:p-16 text-white shadow-2xl" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}>
          {/* Background decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-24 -translate-x-24"></div>
          <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-white/5 rounded-full -translate-x-16 -translate-y-16"></div>
          
          <div className="relative z-10 text-center">
            <div className="inline-block mb-6">
              <span className="inline-flex items-center px-4 py-2 bg-white/20 text-white text-sm font-open-sans font-medium rounded-full border border-white/30">
                <i className="fas fa-sparkles mr-2"></i>
                Start Your Art Journey
              </span>
            </div>
            
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold mb-6 leading-tight">
              Ready to Add Beauty to Your Space?
            </h2>
            
            <p className="text-xl lg:text-2xl font-lora mb-10 opacity-90 max-w-3xl mx-auto leading-relaxed">
              Explore our collection of unique watercolor artworks and bring nature's beauty into your home
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href="/gallery" 
                className="group inline-flex items-center px-8 py-4 bg-white font-open-sans font-bold rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                style={{ color: '#4a5d4a' }}
              >
                <i className="fas fa-palette mr-3 group-hover:rotate-12 transition-transform duration-300"></i>
                Browse Gallery
                <i className="fas fa-arrow-right ml-3 group-hover:translate-x-1 transition-transform duration-300"></i>
              </a>
              
              <a 
                href="/contact" 
                className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-open-sans font-bold rounded-full hover:bg-white transition-all duration-300 transform hover:scale-105"
                style={{ '--hover-color': '#4a5d4a' } as React.CSSProperties}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#4a5d4a')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'white')}
              >
                <i className="fas fa-envelope mr-3"></i>
                Get in Touch
              </a>
            </div>
            
            {/* Trust indicators */}
            <div className="mt-12 pt-8 border-t border-white/20">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <i className="fas fa-shipping-fast text-white text-lg"></i>
                  </div>
                  <p className="text-sm font-open-sans opacity-90">Free U.S. Shipping</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <i className="fas fa-hand-holding-heart text-white text-lg"></i>
                  </div>
                  <p className="text-sm font-open-sans opacity-90">Handmade with Love</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-2">
                    <i className="fas fa-certificate text-white text-lg"></i>
                  </div>
                  <p className="text-sm font-open-sans opacity-90">Original Artwork</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;