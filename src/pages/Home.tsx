import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllProducts, Product, testFirebaseConnection } from '../services/firebase';
import { useCart } from '../context/CartContext';

const Home: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addItem } = useCart();

  // Available images for the carousel
  const carouselImages = [
    {
      src: "/Honey Dipper.jpeg",
      alt: "Honey Dipper Watercolor"
    },
    {
      src: "/Hand-Painted Watercolor Bookmark - Yellow Desert Wildflowers.jpeg",
      alt: "Yellow Desert Wildflowers"
    },
    {
      src: "/Smoky Mountain Forest Watercolor Bookmark - Misty Night Rain Scene.jpeg",
      alt: "Smoky Mountain Forest"
    },
    {
      src: "/Wildflower Meadow Watercolor Bookmark - Golden Field Art.jpeg",
      alt: "Wildflower Meadow"
    },
    {
      src: "/Water drops.jpeg",
      alt: "Water Drops"
    },
    {
      src: "/Moroz.jpg",
      alt: "Artist Portrait"
    }
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      // Test Firebase connection first
      const connectionTest = await testFirebaseConnection();
      
      try {
        const products = await getAllProducts();
        // Get first 6 products as featured
        setFeaturedProducts(products.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    if (product.id) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center overflow-hidden -mt-28" 
        style={{
          background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
          paddingTop: '7rem',
          paddingBottom: '3rem'
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Geometric shapes */}
          <div className="absolute top-20 left-10 w-20 h-20 border-2 border-white/20 rounded-full animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-lg rotate-45 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-24 h-24 border-2 border-white/15 rounded-full animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-12 h-12 bg-white/10 rounded-full animate-float" style={{animationDelay: '1s'}}></div>
          
          {/* Floating dots */}
          <div className="absolute top-60 left-1/2 w-3 h-3 bg-white/30 rounded-full animate-bubble" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-40 right-10 w-4 h-4 bg-white/25 rounded-full animate-bubble" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/4 left-20 w-2 h-2 bg-white/40 rounded-full animate-bubble" style={{animationDelay: '1.5s'}}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Side - Enhanced Text Content */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6 max-w-2xl mx-auto lg:mx-0">
                {/* Watercolor Artist Badge */}
                <div className="inline-flex items-center mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <div className="w-4.5 h-5.5 rounded-full bg-[#8fa68b] mr-2"></div>
                  <span className="px-5 py-1.5 rounded-full border border-white/30 text-white/90 text-base backdrop-blur-sm font-open-sans">
                    Watercolor Artist
                  </span>
                </div>
                
                <h1 
                  className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight text-white animate-fade-in-up"
                  style={{ animationDelay: '0.2s' }}
                >
                  Nature-Inspired
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Watercolors with a Story
                  </span>
                </h1>
                <p 
                  className="font-lora text-lg lg:text-xl leading-relaxed text-white/90 max-w-xl animate-fade-in-up"
                  style={{ animationDelay: '0.4s' }}
                >
                  Phoenix-based artist Ksenia Moroz blends the soulful depth of Russian artistry with the vibrant freedom of the American Southwest.
                </p>
                
                {/* Three horizontal points */}
                <div className="flex flex-wrap md:flex-nowrap justify-between gap-x-4 gap-y-3 mt-4 animate-fade-in-up font-lora" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center whitespace-nowrap">
                    <div className="w-2 h-2 rounded-full bg-white/90 mr-2"></div>
                    <span className="text-white/90">Handcrafted Originals</span>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <div className="w-2 h-2 rounded-full bg-white/90 mr-2"></div>
                    <span className="text-white/90">Custom Commissions</span>
                  </div>
                  <div className="flex items-center whitespace-nowrap">
                    <div className="w-2 h-2 rounded-full bg-white/90 mr-2"></div>
                    <span className="text-white/90">Worldwide Shipping</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/gallery"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#8fa68b] font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl group"
                >
                  <span>View Portfolio</span>
                  <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-white/30 text-[#8fa68b] font-semibold rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                >
                  <span className='mr-2'>Request a Custom Piece</span>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Side - Modern Art Showcase */}
            <div className="flex justify-center lg:justify-end animate-fade-in-right" style={{ animationDelay: '0.8s' }}>
              <div className="relative">
                {/* Main artwork display */}
                <div className="relative bg-white/10 backdrop-blur-lg p-6 rounded-3xl border border-white/20 shadow-2xl">
                  <div className="relative overflow-hidden rounded-2xl" style={{ width: '320px', height: '400px' }}>
                    <img 
                      src={carouselImages[currentImageIndex].src}
                      alt={carouselImages[currentImageIndex].alt}
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out"
                    />
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    
                    {/* Navigation */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {carouselImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex 
                              ? 'bg-white scale-125' 
                              : 'bg-white/50 hover:bg-white/75'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Arrow navigation */}
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-2 transition-all duration-200"
                    >
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Artwork info */}
                  <div className="mt-4 text-center">
                    <h3 className="font-patrick-hand text-white font-semibold">{carouselImages[currentImageIndex].alt}</h3>
                    <p className="font-inter text-white/70 text-sm mt-1">Original Watercolor</p>
                  </div>
                </div>
                
                {/* Floating elements around the showcase */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-300 rounded-full opacity-80 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-orange-300 rounded-full opacity-80 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <div className="absolute top-1/2 -left-8 w-4 h-4 bg-pink-300 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '2s' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom CSS for animations */}
       <style>{`
         @keyframes fade-in-up {
           from {
             opacity: 0;
             transform: translateY(30px);
           }
           to {
             opacity: 1;
             transform: translateY(0);
           }
         }
         
         @keyframes fade-in-right {
           from {
             opacity: 0;
             transform: translateX(50px);
           }
           to {
             opacity: 1;
             transform: translateX(0);
           }
         }
         
         .animate-fade-in-up {
           animation: fade-in-up 0.8s ease-out forwards;
           opacity: 0;
         }
         
         .animate-fade-in-right {
           animation: fade-in-right 0.8s ease-out forwards;
           opacity: 0;
         }
       `}</style>

      {/* Featured Products */}
      <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)' }}>
        {/* Decorative background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200/30 to-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-32 right-20 w-40 h-40 bg-gradient-to-br from-pink-200/30 to-orange-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-yellow-200/30 to-green-200/30 rounded-full blur-xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white text-sm font-medium font-open-sans rounded-full shadow-lg">
                ✨ Handcrafted Collection
              </span>
            </div>
            <h2 
              className="font-playfair text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-800 via-accent-700 to-primary-800 bg-clip-text text-transparent leading-tight"
            >
              Featured Works
            </h2>
            <p 
              className="font-lora text-xl lg:text-2xl max-w-3xl mx-auto leading-relaxed text-primary-700"
            >
              A glimpse into Ksenia's world of watercolor landscapes, floral studies, and one-of-a-kind commissions. Each piece tells a story—of nature, travel, and emotion.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mt-8 rounded-full"></div>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[...Array(6)].map((_, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-slate-200 to-slate-300 animate-pulse h-96 relative overflow-hidden"
                  style={{
                    borderTopLeftRadius: '80px',
                    borderBottomRightRadius: '80px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {featuredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="group bg-white overflow-hidden transition-all duration-500 hover:scale-105 relative"
                  style={{ 
                     boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
                     borderTopLeftRadius: '80px',
                     borderBottomRightRadius: '80px',
                     border: '1px solid rgba(226, 232, 240, 0.8)'
                   }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ borderTopLeftRadius: '80px', borderBottomRightRadius: '80px' }}></div>
                  <div className="aspect-square overflow-hidden relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                    {/* Image overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Quick view badge */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                      <span className="bg-white/90 backdrop-blur-sm text-slate-700 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                        Quick View
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 relative">
                    <div className="mb-4">
                      <h3 
                        className="font-playfair text-xl font-bold mb-3 group-hover:text-primary-700 transition-colors duration-300 text-primary-800"
                      >
                        {product.name}
                      </h3>
                      <p 
                        className="font-lora text-sm leading-relaxed line-clamp-2 text-primary-700"
                      >
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <span 
                          className="font-playfair text-3xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent"
                        >
                          ${product.price}
                        </span>
                        <span className="text-xs text-primary-600 font-medium font-open-sans">USD</span>
                      </div>
                      
                      {/* Rating stars placeholder */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                          </svg>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-3">
                      <Link
                        to={`/product/${product.id}`}
                        className="flex-1 font-open-sans px-6 py-3 bg-gradient-to-r from-primary-50 to-primary-100 text-primary-700 rounded-2xl hover:bg-gradient-to-r hover:from-primary-100 hover:to-primary-200 transition-all duration-300 text-center font-medium group-hover:shadow-lg"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 font-open-sans px-6 py-3 text-white rounded-2xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                        style={{
                          background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)'
                        }}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-16">
            <div className="inline-flex flex-col items-center gap-4">
              <p className="font-lora text-primary-600 text-lg">
                Explore our complete collection of unique watercolor artworks
              </p>
              <Link
                to="/gallery"
                className="group font-open-sans inline-flex items-center gap-3 px-10 py-4 text-white font-bold rounded-full transition-all duration-500 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 50%, #cf955f 100%)',
                  boxShadow: '0 10px 30px rgba(145, 166, 138, 0.3)'
                }}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative z-10">View All Products</span>
                <svg className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              
              {/* Stats */}
              <div className="flex items-center gap-8 mt-6 text-sm text-primary-600 font-open-sans">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span>50+ Unique Pieces</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-accent-500 rounded-full animate-pulse"></div>
                  <span>Handcrafted Quality</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse"></div>
                  <span>Free Shipping $50+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="font-playfair text-4xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-800 via-accent-700 to-primary-800 bg-clip-text text-transparent leading-tight"
              >
                About Moroz Custom Art
              </h2>
              <p 
                className="font-lora text-xl lg:text-2xl mb-6 leading-relaxed text-primary-700"
              >
                Welcome to my world of watercolor art! I'm passionate about creating unique, handmade pieces that capture the beauty of nature and landscapes. Each artwork is carefully crafted using high-quality watercolor paints and professional paper.
              </p>
              <p 
                className="font-lora text-xl lg:text-2xl mb-6 leading-relaxed text-primary-700"
              >
                Based in Phoenix, Arizona, I draw inspiration from the stunning desert landscapes, national parks, and natural wonders of the Southwest. Every piece is original and one-of-a-kind.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', color: 'white' }}
                  >
                    <i className="fas fa-palette text-xl"></i>
                  </div>
                  <h3 
                    className="font-playfair text-lg font-semibold mb-2 text-primary-800"
                  >
                    Original Art
                  </h3>
                  <p className="font-lora text-primary-700">
                     Every piece is hand-painted and unique
                   </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', color: 'white' }}
                  >
                    <i className="fas fa-leaf text-xl"></i>
                  </div>
                  <h3 
                    className="font-inter text-lg font-semibold mb-2"
                    style={{ color: '#2c3e50' }}
                  >
                    Nature Inspired
                  </h3>
                  <p className="font-inter" style={{ color: '#7f8c8d' }}>
                    Capturing the beauty of landscapes and wildlife
                  </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)', color: 'white' }}
                  >
                    <i className="fas fa-heart text-xl"></i>
                  </div>
                  <h3 
                    className="font-inter text-lg font-semibold mb-2"
                    style={{ color: '#2c3e50' }}
                  >
                    Made with Love
                  </h3>
                  <p className="font-inter" style={{ color: '#7f8c8d' }}>
                    Crafted with passion and attention to detail
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/Hand-Painted Watercolor Bookmark - Yellow Desert Wildflowers.jpeg" 
                alt="Watercolor artwork" 
                className="w-full h-96 object-cover"
                style={{ 
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                  borderTopLeftRadius: '80px',
                  borderBottomRightRadius: '80px'
                }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/Water drops.jpeg';
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Policies Section */}
      <section className="py-20" style={{ background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 50%, #f1f3f4 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 
              className="font-playfair text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r bg-clip-text text-transparent"
              style={{ 
                background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              Shipping & Policies
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}></div>
            <p 
              className="font-lora text-xl max-w-3xl mx-auto leading-relaxed text-primary-700"
              style={{ color: '#4a5d4a', lineHeight: '1.8' }}
            >
              We're committed to providing you with exceptional service and ensuring your beautiful artwork arrives safely at your doorstep.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div 
              className="p-10 text-center group relative overflow-hidden"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 15px 35px rgba(145, 166, 138, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderTopLeftRadius: '50px',
                borderBottomRightRadius: '60px',
                border: '1px solid rgba(145, 166, 138, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(145, 166, 138, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(145, 166, 138, 0.08)';
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
              ></div>
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                  boxShadow: '0 10px 25px rgba(145, 166, 138, 0.3)'
                }}
              >
                <i className="fas fa-shipping-fast text-white text-2xl"></i>
              </div>
              <h3 
                className="font-playfair text-2xl font-bold mb-6"
                style={{ color: '#4a5d4a' }}
              >
                Fast Shipping
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <span className="font-open-sans font-medium" style={{ color: '#4a5d4a' }}>Postcards/Bookmarks</span>
                  <span className="font-playfair font-bold" style={{ color: '#cf955f' }}>$6</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <span className="font-open-sans font-medium" style={{ color: '#4a5d4a' }}>Wall Art (Small)</span>
                  <span className="font-playfair font-bold" style={{ color: '#cf955f' }}>$12</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <span className="font-open-sans font-medium" style={{ color: '#4a5d4a' }}>Wall Art (Large)</span>
                  <span className="font-playfair font-bold" style={{ color: '#cf955f' }}>$20</span>
                </div>
                <div 
                  className="p-4 rounded-lg text-center font-open-sans font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                >
                  FREE shipping on orders $50+
                </div>
                <p className="font-open-sans text-sm mt-4" style={{ color: '#6b7d6b' }}>
                  <i className="fas fa-map-marker-alt mr-2" style={{ color: '#cf955f' }}></i>
                  Local Phoenix delivery available
                </p>
              </div>
            </div>
            
            <div 
              className="p-10 text-center group relative overflow-hidden"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 15px 35px rgba(145, 166, 138, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderTopLeftRadius: '50px',
                borderBottomRightRadius: '60px',
                border: '1px solid rgba(145, 166, 138, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(145, 166, 138, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(145, 166, 138, 0.08)';
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
              ></div>
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                  boxShadow: '0 10px 25px rgba(145, 166, 138, 0.3)'
                }}
              >
                <i className="fas fa-credit-card text-white text-2xl"></i>
              </div>
              <h3 
                className="font-playfair text-2xl font-bold mb-6"
                style={{ color: '#4a5d4a' }}
              >
                Secure Payment
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-shield-alt mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>SSL encrypted checkout</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-credit-card mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>All major cards accepted</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fab fa-paypal mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>PayPal available</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-lock mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>Bank-level security</span>
                </div>
                <div 
                  className="p-4 rounded-lg text-center font-open-sans font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                >
                  No hidden fees ever
                </div>
              </div>
            </div>
            
            <div 
              className="p-10 text-center group relative overflow-hidden"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 15px 35px rgba(145, 166, 138, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                borderTopLeftRadius: '50px',
                borderBottomRightRadius: '60px',
                border: '1px solid rgba(145, 166, 138, 0.1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 25px 60px rgba(145, 166, 138, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 15px 35px rgba(145, 166, 138, 0.08)';
              }}
            >
              <div 
                className="absolute top-0 left-0 w-full h-1"
                style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
              ></div>
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-all duration-300"
                style={{ 
                  background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
                  boxShadow: '0 10px 25px rgba(145, 166, 138, 0.3)'
                }}
              >
                <i className="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 
                className="font-playfair text-2xl font-bold mb-6"
                style={{ color: '#4a5d4a' }}
              >
                Quality Guarantee
              </h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-star mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>100% satisfaction guarantee</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-undo mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>30-day return policy</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-box mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>Professional packaging</span>
                </div>
                <div className="flex items-center p-3 rounded-lg" style={{ backgroundColor: '#f8f9fa' }}>
                  <i className="fas fa-headset mr-3" style={{ color: '#cf955f' }}></i>
                  <span className="font-open-sans" style={{ color: '#4a5d4a' }}>Dedicated support team</span>
                </div>
                <div 
                  className="p-4 rounded-lg text-center font-open-sans font-bold text-white"
                  style={{ background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)' }}
                >
                  Insured shipping included
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CSS Animations for floating elements */}
      <style>
        {`
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) translateX(0px);
            }
            25% {
              transform: translateY(-20px) translateX(10px);
            }
            50% {
              transform: translateY(-10px) translateX(-15px);
            }
            75% {
              transform: translateY(-30px) translateX(5px);
            }
          }
          
          @keyframes bubble {
            0% {
              transform: translateY(0px) scale(1);
              opacity: 0.7;
            }
            50% {
              transform: translateY(-15px) scale(1.1);
              opacity: 0.9;
            }
            100% {
              transform: translateY(-30px) scale(0.9);
              opacity: 0.5;
            }
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animate-bubble {
            animation: bubble 4s ease-in-out infinite;
          }
          
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
          
          .animate-shimmer {
            animation: shimmer 2s ease-in-out infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Home;