import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { setSelectedCategory } from '../redux/filterSlice';
import type { CategoryColors } from '../types/product';

const CategoryFilter = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, selectedCategory } = useSelector((state: RootState) => state.filter);

  const categoryColors: CategoryColors = {
    electronics: 'from-blue-500 to-cyan-500',
    jewelery: 'from-purple-500 to-pink-500',
    "men's clothing": 'from-green-500 to-emerald-500',
    "women's clothing": 'from-pink-500 to-rose-500',
  };

  const handleCategorySelect = (category: string): void => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-wrap gap-2"
    >
      <motion.button
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleCategorySelect('')}
        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-md hover:shadow-lg ${
          selectedCategory === ''
            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
            : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-gray-200/50'
        }`}
      >
        All
      </motion.button>
      {categories.map((category) => (
        <motion.button
          key={category}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCategorySelect(category)}
          className={`px-5 py-2.5 rounded-full text-sm font-medium capitalize transition-all duration-300 shadow-md hover:shadow-lg ${
            selectedCategory === category
              ? `bg-gradient-to-r ${categoryColors[category] || 'from-gray-600 to-gray-800'} text-white`
              : 'bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gray-100 border border-gray-200/50'
          }`}
        >
          {category}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategoryFilter;