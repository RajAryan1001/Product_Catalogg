import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import type { RootState, AppDispatch } from '../redux/store';
import { fetchProducts, setFilteredProducts } from '../redux/productSlice';
import { setSearchTerm, setSelectedCategory } from '../redux/filterSlice';
import ProductList from '../components/ProductList';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const ProductListing = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, filteredItems, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { searchTerm, selectedCategory } = useSelector(
    (state: RootState) => state.filter
  );

  // Fetch products on mount
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  // Filter products when search or category changes
  useEffect(() => {
    let filtered = items;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    dispatch(setFilteredProducts(filtered));
  }, [items, searchTerm, selectedCategory, dispatch]);

  // Clear all filters
  const clearFilters = (): void => {
    dispatch(setFilteredProducts(items));
    dispatch(setSearchTerm(''));
    dispatch(setSelectedCategory(''));
  };

  // Loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Error state
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
      <div className="bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Product Catalog
            </motion.h1>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <SearchBar className="w-full sm:w-64" />
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-sm border border-gray-200/50"
        >
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-600">Filter by:</span>
            <CategoryFilter />
          </div>
          
          {(searchTerm || selectedCategory) && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={clearFilters}
              className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 px-3 py-1.5 rounded-full hover:bg-blue-50 transition-colors"
            >
              <span>Clear Filters</span>
              <span className="text-lg">✕</span>
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Results Count */}
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-between items-center mb-4"
        >
          <p className="text-sm text-gray-500">
            Showing <span className="font-semibold text-gray-700">{filteredItems.length}</span> products
            {(searchTerm || selectedCategory) && (
              <span className="text-gray-400">
                {' '}• {searchTerm && `Search: "${searchTerm}"`}
                {searchTerm && selectedCategory && ' • '}
                {selectedCategory && `Category: ${selectedCategory}`}
              </span>
            )}
          </p>
        </motion.div>
      </div>

      {/* Product List */}
      <div className="container mx-auto px-4 pb-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={filteredItems.length}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ProductList products={filteredItems} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductListing;