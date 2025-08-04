import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, isAdmin, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsAccountDropdownOpen(false);
  };

  return (
    <>
      {/* Spacer to prevent content from hiding behind fixed header */}
      <div className="h-20"></div>
      
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white'
        }`}
        style={{
          borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid #e9ecef'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Business Name - Left */}
            <Link 
              to="/" 
              className="flex items-center space-x-3 group transition-transform duration-300 hover:scale-105"
            >
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 group-hover:shadow-xl"
                style={{ 
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                <i className="fas fa-palette text-white text-lg"></i>
              </div>
              <div className="flex flex-col">
                <span 
                  className="font-playfair text-2xl font-bold transition-colors duration-300 group-hover:text-purple-600"
                  style={{ color: '#2c3e50' }}
                >
                  Moroz Art
                </span>
                <span className="text-xs text-gray-500 font-medium tracking-wide">
                  Custom Watercolor Art
                </span>
              </div>
            </Link>

            {/* Navigation Links - Center */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { to: '/', label: 'Home', icon: 'fas fa-home' },
                { to: '/gallery', label: 'Shop', icon: 'fas fa-store' },
                { to: '/about', label: 'About', icon: 'fas fa-info-circle' },
                { to: '/policies', label: 'Policies', icon: 'fas fa-file-contract' },
                { to: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                  style={{ 
                    color: '#2c3e50',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#667eea';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2c3e50';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <i className={`${item.icon} text-sm opacity-70 group-hover:opacity-100 transition-opacity duration-300`}></i>
                    <span>{item.label}</span>
                  </div>
                  <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
                </Link>
              ))}
            </nav>

            {/* Right Section - Cart & Account */}
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <Link
                to="/cart"
                className="group relative p-3 rounded-full transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                style={{ color: '#2c3e50' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.1)';
                  e.currentTarget.style.color = '#667eea';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.color = '#2c3e50';
                }}
              >
                <i className="fas fa-shopping-cart text-xl"></i>
                {itemCount > 0 && (
                  <span 
                    className="absolute -top-1 -right-1 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse"
                    style={{ 
                      background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                      boxShadow: '0 2px 8px rgba(255, 107, 107, 0.3)'
                    }}
                  >
                    {itemCount}
                  </span>
                )}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              </Link>

              {/* Account Section - Hidden on Mobile */}
              {currentUser ? (
                <div className="relative hidden lg:block">
                  <button
                    onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                    className="group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    <i className="fas fa-user text-white text-lg group-hover:scale-110 transition-transform duration-300"></i>
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </button>

                  {/* Enhanced Dropdown Menu */}
                  {isAccountDropdownOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40"
                        onClick={() => setIsAccountDropdownOpen(false)}
                      ></div>
                      <div 
                        className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border z-50 overflow-hidden animate-in slide-in-from-top-2 duration-200"
                        style={{ 
                          borderColor: '#e9ecef',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                        }}
                      >
                        {/* User Info Header */}
                        <div 
                          className="px-6 py-4 bg-gradient-to-r from-purple-50 to-blue-50 border-b"
                          style={{ borderBottomColor: '#e9ecef' }}
                        >
                          <div className="flex items-center space-x-3">
                            <div 
                              className="w-10 h-10 rounded-full flex items-center justify-center"
                              style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                            >
                              <i className="fas fa-user text-white"></i>
                            </div>
                            <div>
                              <p className="text-sm font-semibold" style={{ color: '#2c3e50' }}>Welcome back!</p>
                              <p className="text-xs truncate" style={{ color: '#7f8c8d' }}>{currentUser.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {isAdmin && (
                            <Link
                              to="/admin"
                              className="flex items-center px-6 py-3 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                              style={{ color: '#2c3e50' }}
                              onClick={() => setIsAccountDropdownOpen(false)}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#667eea';
                                e.currentTarget.style.paddingLeft = '1.75rem';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.color = '#2c3e50';
                                e.currentTarget.style.paddingLeft = '1.5rem';
                              }}
                            >
                              <i className="fas fa-cog mr-3 text-purple-500"></i>
                              Admin Dashboard
                            </Link>
                          )}
                          <Link
                            to="/orders"
                            className="flex items-center px-6 py-3 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                            style={{ color: '#2c3e50' }}
                            onClick={() => setIsAccountDropdownOpen(false)}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#667eea';
                              e.currentTarget.style.paddingLeft = '1.75rem';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#2c3e50';
                              e.currentTarget.style.paddingLeft = '1.5rem';
                            }}
                          >
                            <i className="fas fa-box mr-3 text-blue-500"></i>
                            My Orders
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center px-6 py-3 text-sm transition-all duration-200 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50"
                            style={{ color: '#2c3e50' }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.color = '#e74c3c';
                              e.currentTarget.style.paddingLeft = '1.75rem';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.color = '#2c3e50';
                              e.currentTarget.style.paddingLeft = '1.5rem';
                            }}
                          >
                            <i className="fas fa-sign-out-alt mr-3 text-red-500"></i>
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="hidden lg:flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                    style={{ color: '#2c3e50' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#667eea';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#2c3e50';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-all duration-300 hover:scale-105"
                    style={{ 
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
                    }}
                  >
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                style={{ color: '#2c3e50' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#667eea';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#2c3e50';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <div className="relative w-6 h-6">
                  <span className={`absolute top-0 left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'rotate-45 top-2.5' : ''}`}></span>
                  <span className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`absolute top-5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${isMenuOpen ? '-rotate-45 top-2.5' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`lg:hidden transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="py-4 space-y-2 border-t overflow-y-auto" style={{ borderTopColor: '#e9ecef', maxHeight: 'calc(100vh - 200px)' }}>
              {/* Navigation Links */}
              {[
                { to: '/', label: 'Home', icon: 'fas fa-home' },
                { to: '/gallery', label: 'Shop', icon: 'fas fa-store' },
                { to: '/about', label: 'About', icon: 'fas fa-info-circle' },
                { to: '/policies', label: 'Policies', icon: 'fas fa-file-contract' },
                { to: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                  style={{ color: '#2c3e50' }}
                  onClick={() => setIsMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#667eea';
                    e.currentTarget.style.paddingLeft = '1.25rem';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#2c3e50';
                    e.currentTarget.style.paddingLeft = '1rem';
                  }}
                >
                  <i className={`${item.icon} mr-3 text-purple-500`}></i>
                  {item.label}
                </Link>
              ))}
              
              {/* Account Section for Mobile */}
              <div className="border-t pt-2 mt-2" style={{ borderTopColor: '#e9ecef' }}>
                {currentUser ? (
                  <>
                    {/* User Info */}
                    <div className="px-4 py-3 mx-2">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
                        >
                          <i className="fas fa-user text-white text-sm"></i>
                        </div>
                        <div>
                          <p className="text-sm font-semibold" style={{ color: '#2c3e50' }}>Welcome back!</p>
                          <p className="text-xs truncate" style={{ color: '#7f8c8d' }}>{currentUser.email}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Admin Dashboard Link */}
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                        style={{ color: '#2c3e50' }}
                        onClick={() => setIsMenuOpen(false)}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.color = '#667eea';
                          e.currentTarget.style.paddingLeft = '1.25rem';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.color = '#2c3e50';
                          e.currentTarget.style.paddingLeft = '1rem';
                        }}
                      >
                        <i className="fas fa-cog mr-3 text-purple-500"></i>
                        Admin Dashboard
                      </Link>
                    )}
                    
                    {/* Order History Link */}
                    <Link
                      to="/orders"
                      className="flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50"
                      style={{ color: '#2c3e50' }}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.paddingLeft = '1.25rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2c3e50';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                    >
                      <i className="fas fa-box mr-3 text-blue-500"></i>
                      My Orders
                    </Link>
                    
                    {/* Sign Out Button */}
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="w-full flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50"
                      style={{ color: '#2c3e50' }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#e74c3c';
                        e.currentTarget.style.paddingLeft = '1.25rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2c3e50';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                    >
                      <i className="fas fa-sign-out-alt mr-3 text-red-500"></i>
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    {/* Sign In Link */}
                    <Link
                      to="/login"
                      className="flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                      style={{ color: '#2c3e50' }}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.paddingLeft = '1.25rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2c3e50';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                    >
                      <i className="fas fa-sign-in-alt mr-3 text-purple-500"></i>
                      Sign In
                    </Link>
                    
                    {/* Sign Up Link */}
                    <Link
                      to="/register"
                      className="flex items-center px-4 py-3 rounded-lg mx-2 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50"
                      style={{ color: '#2c3e50' }}
                      onClick={() => setIsMenuOpen(false)}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = '#667eea';
                        e.currentTarget.style.paddingLeft = '1.25rem';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = '#2c3e50';
                        e.currentTarget.style.paddingLeft = '1rem';
                      }}
                    >
                      <i className="fas fa-user-plus mr-3 text-purple-500"></i>
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;