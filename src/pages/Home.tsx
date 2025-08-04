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
        className="flex items-center min-h-screen relative overflow-hidden" 
        style={{
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          paddingBottom: '2rem'
        }}
      >
        {/* Floating Watercolor Elements */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Large watercolor blobs */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-30 blur-xl animate-float" style={{animationDelay: '0s'}}></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-200 rounded-full opacity-25 blur-lg animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-pink-200 rounded-full opacity-20 blur-2xl animate-float" style={{animationDelay: '4s'}}></div>
          <div className="absolute top-1/3 right-1/3 w-28 h-28 bg-cyan-200 rounded-full opacity-30 blur-xl animate-float" style={{animationDelay: '1s'}}></div>
          
          {/* Medium watercolor drops */}
          <div className="absolute top-60 left-1/2 w-16 h-16 bg-indigo-200 rounded-full opacity-40 blur-md animate-float" style={{animationDelay: '3s'}}></div>
          <div className="absolute bottom-40 right-10 w-20 h-20 bg-teal-200 rounded-full opacity-35 blur-lg animate-float" style={{animationDelay: '5s'}}></div>
          <div className="absolute top-1/4 left-20 w-12 h-12 bg-violet-200 rounded-full opacity-45 blur-sm animate-float" style={{animationDelay: '1.5s'}}></div>
          
          {/* Small bubbles */}
          <div className="absolute top-32 right-1/4 w-8 h-8 bg-blue-300 rounded-full opacity-50 animate-bubble" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-1/3 w-6 h-6 bg-purple-300 rounded-full opacity-60 animate-bubble" style={{animationDelay: '2.5s'}}></div>
          <div className="absolute top-1/2 right-40 w-10 h-10 bg-pink-300 rounded-full opacity-40 animate-bubble" style={{animationDelay: '4.5s'}}></div>
          <div className="absolute bottom-60 left-40 w-4 h-4 bg-cyan-300 rounded-full opacity-70 animate-bubble" style={{animationDelay: '3.5s'}}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-44 items-center">
            {/* Left Side - Text Content */}
            <div className="space-y-6 lg:space-y-8 lg:pr-8 text-center lg:text-left">
              <div className="space-y-4 lg:space-y-6">
                <h1 
                  className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight animate-fade-in-up"
                  style={{ 
                    fontFamily: 'Playfair Display, serif',
                    color: '#2c3e50',
                    animationDelay: '0.2s'
                  }}
                >
                  Original Watercolor Art
                </h1>
                <p 
                  className="text-base sm:text-lg lg:text-xl leading-relaxed animate-fade-in-up px-4 sm:px-0"
                  style={{ 
                    color: '#7f8c8d',
                    animationDelay: '0.4s'
                  }}
                >
                  Handcrafted with love in Phoenix, Arizona. Each piece is a unique work of art capturing the beauty of nature through delicate watercolor techniques.
                </p>
              </div>
              <div className="animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to="/gallery"
                  className="inline-block px-6 sm:px-8 py-3 sm:py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 text-sm sm:text-base"
                  style={{
                    background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
                    boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(231, 76, 60, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)';
                  }}
                >
                  Shop Collection
                </Link>
              </div>
            </div>

            {/* Right Side - Polaroid Carousel */}
             <div className="flex justify-center lg:justify-start lg:ml-4 mt-8 lg:mt-0">
               <div className="relative animate-fade-in-right lg:-mt-16" style={{ animationDelay: '0.8s' }}>
                {/* Polaroid Container */}
                <div 
                  className="relative bg-white p-3 sm:p-4 pb-12 sm:pb-16 shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-500 hover:scale-105 mx-4 sm:mx-0"
                  style={{
                    width: '280px',
                    maxWidth: '90vw',
                    borderRadius: '8px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
                  }}
                >
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-72 sm:h-96">
                    <img 
                      src={carouselImages[currentImageIndex].src}
                      alt={carouselImages[currentImageIndex].alt}
                      className="w-full h-full object-cover transition-all duration-500 ease-in-out"
                      style={{ borderRadius: '4px' }}
                    />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      style={{ backdropFilter: 'blur(10px)' }}
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                      style={{ backdropFilter: 'blur(10px)' }}
                    >
                      <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Polaroid Caption */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <p 
                      className="text-center text-gray-700 font-handwriting text-lg"
                      style={{ fontFamily: 'Caveat, cursive' }}
                    >
                      {carouselImages[currentImageIndex].alt}
                    </p>
                  </div>
                  
                  {/* Image Indicators */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {carouselImages.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === currentImageIndex 
                            ? 'bg-red-500 scale-125' 
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Floating Elements for Extra Visual Appeal */}
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-200 rounded-full opacity-70 animate-bounce" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-pink-200 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
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
      <section className="py-20" style={{ background: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="text-3xl lg:text-4xl font-bold mb-5"
              style={{ 
                fontFamily: 'Playfair Display, serif',
                color: '#2c3e50'
              }}
            >
              Our Collection
            </h2>
            <p 
              className="text-lg lg:text-xl italic"
              style={{ color: '#7f8c8d' }}
            >
              Discover our handcrafted watercolor artworks
            </p>
          </div>
          
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-neutral-200 animate-pulse rounded-lg h-80"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
                  style={{ boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 
                      className="font-playfair text-xl font-semibold mb-2"
                      style={{ color: '#2c3e50' }}
                    >
                      {product.name}
                    </h3>
                    <p 
                      className="mb-4 line-clamp-2"
                      style={{ color: '#7f8c8d' }}
                    >
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-2xl font-bold"
                        style={{ color: '#e74c3c' }}
                      >
                        ${product.price}
                      </span>
                      <div className="flex gap-2">
                        <Link
                          to={`/product/${product.id}`}
                          className="px-4 py-2 bg-neutral-100 text-neutral-700 rounded-lg hover:bg-neutral-200 transition-colors duration-200"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2 text-white rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1"
                          style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                          }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="text-center mt-12">
            <Link
              to="/gallery"
              className="inline-block px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 transform hover:-translate-y-1"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
              }}
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20" style={{ background: 'white' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 
                className="text-3xl lg:text-4xl font-bold mb-6"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2c3e50'
                }}
              >
                About Moroz Custom Art
              </h2>
              <p 
                className="text-lg mb-6 leading-relaxed"
                style={{ color: '#555' }}
              >
                Welcome to my world of watercolor art! I'm passionate about creating unique, handmade pieces that capture the beauty of nature and landscapes. Each artwork is carefully crafted using high-quality watercolor paints and professional paper.
              </p>
              <p 
                className="text-lg mb-8 leading-relaxed"
                style={{ color: '#555' }}
              >
                Based in Phoenix, Arizona, I draw inspiration from the stunning desert landscapes, national parks, and natural wonders of the Southwest. Every piece is original and one-of-a-kind.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: '#667eea', color: 'white' }}
                  >
                    <i className="fas fa-palette text-xl"></i>
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#2c3e50' }}
                  >
                    Original Art
                  </h3>
                  <p style={{ color: '#7f8c8d' }}>
                    Every piece is hand-painted and unique
                  </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: '#667eea', color: 'white' }}
                  >
                    <i className="fas fa-leaf text-xl"></i>
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#2c3e50' }}
                  >
                    Nature Inspired
                  </h3>
                  <p style={{ color: '#7f8c8d' }}>
                    Capturing the beauty of landscapes and wildlife
                  </p>
                </div>
                
                <div className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: '#667eea', color: 'white' }}
                  >
                    <i className="fas fa-heart text-xl"></i>
                  </div>
                  <h3 
                    className="text-lg font-semibold mb-2"
                    style={{ color: '#2c3e50' }}
                  >
                    Made with Love
                  </h3>
                  <p style={{ color: '#7f8c8d' }}>
                    Crafted with passion and attention to detail
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src="/Hand-Painted Watercolor Bookmark - Yellow Desert Wildflowers.jpeg" 
                alt="Watercolor artwork" 
                className="w-full h-96 object-cover rounded-lg"
                style={{ boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)' }}
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
      <section className="py-16" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 
              className="font-playfair text-3xl lg:text-4xl font-bold mb-4"
              style={{ color: '#2c3e50' }}
            >
              Shipping & Policies
            </h2>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: '#7f8c8d' }}
            >
              We're committed to providing you with the best service and ensuring your artwork arrives safely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              className="rounded-lg p-8 text-center"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <i className="fas fa-shipping-fast text-white text-2xl"></i>
              </div>
              <h3 
                className="font-playfair text-xl font-semibold mb-4"
                style={{ color: '#2c3e50' }}
              >
                Shipping
              </h3>
              <ul className="space-y-2" style={{ color: '#7f8c8d' }}>
                <li>Postcards/Bookmarks: $6</li>
                <li>Wall Art (small): $12</li>
                <li>Wall Art (large): $20</li>
                <li>FREE shipping on orders $50+</li>
                <li>Local Phoenix delivery available</li>
              </ul>
            </div>
            
            <div 
              className="rounded-lg p-8 text-center"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <i className="fas fa-credit-card text-white text-2xl"></i>
              </div>
              <h3 
                className="font-playfair text-xl font-semibold mb-4"
                style={{ color: '#2c3e50' }}
              >
                Payment
              </h3>
              <ul className="space-y-2" style={{ color: '#7f8c8d' }}>
                <li>Secure online payments</li>
                <li>Credit & debit cards accepted</li>
                <li>PayPal available</li>
                <li>SSL encrypted checkout</li>
                <li>No hidden fees</li>
              </ul>
            </div>
            
            <div 
              className="rounded-lg p-8 text-center"
              style={{ 
                backgroundColor: 'white',
                boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
              }}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <i className="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 
                className="font-playfair text-xl font-semibold mb-4"
                style={{ color: '#2c3e50' }}
              >
                Guarantee
              </h3>
              <ul className="space-y-2" style={{ color: '#7f8c8d' }}>
                <li>100% satisfaction guarantee</li>
                <li>30-day return policy</li>
                <li>Careful packaging</li>
                <li>Insured shipping</li>
                <li>Customer support</li>
              </ul>
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
        `}
      </style>
    </div>
  );
};

export default Home;