import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchProducts } from '../redux/productSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import type { Product } from '../types/product';

// Animation variants with correct types
const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
      delay: 0.2
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.3
    }
  }
};

const ProductDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading, error } = useSelector((state: RootState) => state.products);
  const [product, setProduct] = useState<Product | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (items.length > 0 && id) {
      const foundProduct = items.find((p) => p.id === Number(id));
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        navigate('/');
      }
    }
  }, [items, id, navigate]);

  useEffect(() => {
    if (items.length === 0 && !loading) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length, loading]);

  const handleImageLoad = (): void => {
    setImageLoaded(true);
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/600x600?text=No+Image';
    setImageLoaded(true);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => dispatch(fetchProducts())}
      />
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-12 max-w-md"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            to="/"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Back to Catalog
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium">Back to Catalog</span>
          </Link>
        </motion.div>

        {/* Product Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-gray-200/50"
        >
          <div className="flex flex-col lg:flex-row">
            {/* Image Section */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2 p-8 lg:p-12 bg-gradient-to-br from-gray-50 to-gray-100/50 flex items-center justify-center relative"
            >
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                </div>
              )}
              <motion.img
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ 
                  scale: imageLoaded ? 1 : 0.8,
                  opacity: imageLoaded ? 1 : 0
                }}
                transition={{ duration: 0.5 }}
                src={product.image}
                alt={product.title}
                className="max-h-96 lg:max-h-[500px] w-full object-contain"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <span className="text-lg">⭐</span>
                <span className="font-bold">{product.rating.rate}</span>
                <span className="text-xs opacity-80">({product.rating.count})</span>
              </motion.div>
            </motion.div>

            {/* Details Section */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="lg:w-1/2 p-8 lg:p-12"
            >
              <div className="mb-4">
                <span className="inline-block bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {product.category}
                </span>
              </div>

              <motion.h1
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4"
              >
                {product.title}
              </motion.h1>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="mb-6"
              >
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-2">
                  Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-6 p-4 bg-gray-50/80 rounded-xl"
              >
                <div className="flex items-center gap-2">
                  <span className="text-2xl text-yellow-500">⭐</span>
                  <div>
                    <p className="text-lg font-bold text-gray-800">{product.rating.rate}</p>
                    <p className="text-xs text-gray-500">Average Rating</p>
                  </div>
                </div>
                <div className="w-px h-10 bg-gray-300"></div>
                <div>
                  <p className="text-lg font-bold text-gray-800">{product.rating.count}</p>
                  <p className="text-xs text-gray-500">Total Reviews</p>
                </div>
              </motion.div>

              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="mt-8 flex flex-col sm:flex-row gap-4"
              >
                <button
                  onClick={() => navigate('/')}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Browse More Products
                </button>
                <button
                  onClick={() => window.history.back()}
                  className="flex-1 bg-white border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
                >
                  Go Back
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Related Products */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
            <span className="w-1 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items
              .filter((p) => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] border border-gray-200/50"
                >
                  <div className="h-32 flex items-center justify-center mb-3">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.title}
                      className="h-full object-contain"
                      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=No+Image';
                      }}
                    />
                  </div>
                  <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                    {relatedProduct.title}
                  </h4>
                  <p className="text-sm font-bold text-blue-600">
                    ${relatedProduct.price.toFixed(2)}
                  </p>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetails;