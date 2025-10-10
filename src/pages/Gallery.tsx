import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getAllProducts, Product } from '../services/firebase';
import ProductImageCarousel from '../components/ProductImageCarousel';
import { useCart } from '../context/CartContext';

const Gallery: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const { addItem } = useCart();

  const categories = ['All', 'Big Wall Art', 'Small Wall Art', 'Bookmarks', 'Customized Stuff', 'Postcards', 'Unframed'];
  const location = useLocation();

  // Normalize category values (supports both slugs and readable names)
  const normalizeCategory = (value: string) => {
    const map: Record<string, string> = {
      'all': 'All',
      'big-wall-art': 'Big Wall Art',
      'small-wall-art': 'Small Wall Art',
      'bookmarks': 'Bookmarks',
      'customized': 'Customized Stuff',
      'customized stuff': 'Customized Stuff',
      'postcards': 'Postcards',
      'unframed': 'Unframed'
    };
    const lower = value.toLowerCase();
    return map[lower] || value;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const allProducts = await getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Read category from URL query param on mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat) {
      const normalized = normalizeCategory(cat);
      if (categories.includes(normalized)) {
        setSelectedCategory(normalized);
      }
    }
  }, [location.search, categories]);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => {
        const productCat = product.category ? normalizeCategory(product.category) : '';
        return productCat.toLowerCase() === selectedCategory.toLowerCase();
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchTerm]);

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
    <>
      {/* CSS Animations */}
      <style>{`
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
            transform: translateY(-100px) scale(1.1);
            opacity: 0.4;
          }
          100% {
            transform: translateY(-200px) scale(0.8);
            opacity: 0;
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-bubble {
          animation: bubble 8s ease-in-out infinite;
        }
      `}</style>
      
      <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <section 
        className="relative py-16 lg:py-20 overflow-hidden min-h-[50vh] -mt-28" 
        style={{
          background: 'linear-gradient(135deg, #91a68a 0%, #cf955f 100%)',
          paddingTop: '8rem'
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
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Art Gallery
            </h1>
            <p className="text-base lg:text-lg text-white/90 max-w-2xl mx-auto px-4 mb-8 font-lora">
              Explore my complete collection of artworks. Each piece is unique and 
              created with passion and attention to detail.
            </p>
            
            {/* Search and Filters */}
            <div className="flex flex-col items-center gap-6 mt-8">
              {/* Search */}
              <div className="relative w-full max-w-md">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                   <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                   </svg>
                 </div>
                <input
                  type="text"
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/70 text-sm lg:text-base"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 lg:px-6 lg:py-3 rounded-full text-xs lg:text-sm font-medium transition-all duration-300 backdrop-blur-sm font-open-sans ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-primary-400 to-accent-400 text-white shadow-lg'
                        : 'bg-white/20 text-white border border-white/30 hover:bg-white/30'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Products Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-neutral-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-neutral-200 rounded mb-2"></div>
                  <div className="h-4 bg-neutral-200 rounded w-2/3 mb-2"></div>
                  <div className="h-6 bg-neutral-200 rounded w-1/3"></div>
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-neutral-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-12 h-12 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                No artworks found
              </h3>
              <p className="text-neutral-600 mb-4">
                Try adjusting your search or filter criteria.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-6">
                <p className="text-neutral-600">
                  Showing {filteredProducts.length} of {products.length} artworks
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredProducts.map((product) => (
                  <div key={product.id} className="group bg-white shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100" style={{borderRadius: '80px 0 80px 0'}}>
                    <div className="relative">
                      <ProductImageCarousel
                        images={(product as any).images && (product as any).images.length > 0 ? (product as any).images : [product.image]}
                        aspectClass="aspect-square"
                        className="bg-gray-50"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-playfair text-lg font-semibold text-primary-800 mb-2 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-primary-700 text-sm mb-4 line-clamp-2 font-lora">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                          ${product.price}
                        </span>
                        <span className="text-xs font-medium text-primary-600 uppercase tracking-wide font-open-sans">
                          USD
                        </span>
                      </div>
                      <div className="flex items-center justify-center mb-4">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-3">
                        <Link
                          to={`/product/${product.id}`}
                          className="flex-1 bg-gradient-to-r from-primary-50 to-primary-100 hover:from-primary-100 hover:to-primary-200 text-primary-700 font-medium py-3 px-4 rounded-xl text-sm text-center transition-all duration-200 font-open-sans"
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex-1 bg-gradient-to-r from-primary-400 to-accent-400 hover:from-primary-500 hover:to-accent-500 text-white font-medium py-3 px-4 rounded-xl text-sm transition-all duration-200 font-open-sans"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
    </>
  );
};

export default Gallery;