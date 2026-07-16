import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchProducts, setFilteredProducts } from '../redux/productSlice';
import { setSearchTerm, setSelectedCategory } from '../redux/filterSlice';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 12,
    },
  },
};

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, filteredItems, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { searchTerm, selectedCategory } = useSelector(
    (state: RootState) => state.filter
  );
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    let filtered = items;

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    dispatch(setFilteredProducts(filtered));
  }, [items, searchTerm, selectedCategory, dispatch]);

  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const clearFilters = (): void => {
    dispatch(setFilteredProducts(items));
    dispatch(setSearchTerm(''));
    dispatch(setSelectedCategory(''));
  };

  const featuredProducts = items.slice(0, 4);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
      >
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            >
              🛒
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <SearchBar className="w-48 md:w-64" />
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-90"></div>
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920')] bg-cover bg-center opacity-20"
        ></motion.div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center text-white">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold mb-6"
              style={{ textShadow: '0 4px 30px rgba(0,0,0,0.3)' }}
            >
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-pink-300">
                Products
              </span>
            </motion.h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-2xl mx-auto">
              Find the best products at the best prices with our curated collection
            </p>
          </motion.div>
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-2 w-full max-w-lg">
              <SearchBar className="max-w-full" />
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="py-8 sticky top-16 z-40 bg-white/70 backdrop-blur-lg border-b border-gray-200/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
              Browse Categories
            </h3>
            <CategoryFilter />
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      {items.length > 0 && !searchTerm && !selectedCategory && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
                Featured Products
              </h2>
              <Link
                to="/catalog"
                className="group flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                View All
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {featuredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.03,
                    y: -5,
                    transition: { type: 'spring', stiffness: 400, damping: 17 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to={`/product/${product.id}`}>
                    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-200/50 hover:border-blue-300">
                      <div className="relative h-56 p-4 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100/50 overflow-hidden">
                        <motion.img
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ delay: index * 0.1 }}
                          src={product.image}
                          alt={product.title}
                          className="h-full object-contain group-hover:scale-110 transition-transform duration-500"
                          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image';
                          }}
                        />
                        <div className="absolute top-2 right-2">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                            ★ {product.rating.rate}
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
                          {product.title}
                        </h3>
                        <div className="flex justify-between items-center">
                          <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            ${product.price.toFixed(2)}
                          </p>
                          <motion.span
                            whileHover={{ x: 5 }}
                            className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            →
                          </motion.span>
                        </div>
                        <p className="text-xs text-gray-500 capitalize mt-1">{product.category}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* All Products */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-800 flex items-center gap-3"
            >
              <span className="w-2 h-8 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full"></span>
              {searchTerm || selectedCategory ? (
                <>
                  Search Results
                  <span className="text-sm font-normal text-gray-500 ml-2">
                    ({filteredItems.length} items)
                  </span>
                </>
              ) : (
                'All Products'
              )}
            </motion.h2>
            {(searchTerm || selectedCategory) && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={clearFilters}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-2 hover:bg-blue-50 px-4 py-2 rounded-full transition-colors"
              >
                Clear Filters ✕
              </motion.button>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={filteredItems.length}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ProductList products={filteredItems} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ShopHub
              </h4>
              <p className="text-gray-400 text-sm">Your one-stop shop for amazing products</p>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Quick Links</h5>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link to="/catalog" className="hover:text-white transition-colors">Catalog</Link></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-3">Connect</h5>
              <p className="text-gray-400 text-sm">Built with ❤️ using React & Tailwind</p>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
            © 2024 ShopHub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;