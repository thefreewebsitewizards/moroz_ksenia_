import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, Product } from '../services/firebase';
import { useCart } from '../context/CartContext';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProductById(id);
          setProduct(productData);
        } catch (error) {
          console.error('Error fetching product:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product && product.id) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="aspect-square bg-neutral-200 rounded-lg animate-pulse"></div>
            <div className="space-y-4">
              <div className="h-8 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
              <div className="h-4 bg-neutral-200 rounded w-2/3 animate-pulse"></div>
              <div className="h-6 bg-neutral-200 rounded w-1/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-neutral-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl font-bold text-neutral-900 mb-4">
            Product Not Found
          </h1>
          <p className="text-neutral-600 mb-8">
            The product you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/gallery" className="btn-primary">
            Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link to="/" className="hover:text-primary-600">
            Home
          </Link>
          <span>/</span>
          <Link to="/gallery" className="hover:text-primary-600">
            Gallery
          </Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-neutral-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="mb-2">
                <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 rounded-full">
                  {product.category}
                </span>
              </div>
              <h1 className="font-playfair text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                {product.name}
              </h1>
              <p className="text-lg text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Price */}
            <div className="border-t border-neutral-200 pt-6">
              <div className="flex items-center space-x-4">
                <span className="text-3xl font-bold text-primary-600">
                  ${product.price}
                </span>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="border-t border-neutral-200 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 btn-primary"
                >
                  Add to Cart - ${product.price.toFixed(2)}
                </button>
                  <Link
                    to="/cart"
                    className="flex-1 btn-secondary text-center"
                  >
                    View Cart
                  </Link>
                </div>
            </div>

            {/* Product Details */}
            <div className="border-t border-neutral-200 pt-6">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Product Details
              </h3>
              <dl className="space-y-3">
                <div className="flex justify-between">
                  <dt className="text-neutral-600">Category:</dt>
                  <dd className="text-neutral-900 font-medium">{product.category}</dd>
                </div>

                <div className="flex justify-between">
                  <dt className="text-neutral-600">Shipping:</dt>
                  <dd className="text-neutral-900 font-medium">From $6 (Free over $50)</dd>
                </div>
              </dl>
            </div>

            {/* Shipping Info */}
            <div className="bg-primary-50 rounded-lg p-4 border border-primary-200">
              <div className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-primary-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4-8-4m16 0v10l-8 4-8-4V7" />
                </svg>
                <div>
                  <h4 className="font-semibold text-primary-900 mb-1">
                    Shipping & Secure Packaging
                  </h4>
                  <p className="text-sm text-primary-700">
                    Small items: $6 • Medium framed: $20 • Free shipping on orders over $50
                    <br />Free local delivery in Phoenix, AZ. All items carefully packaged with tracking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;