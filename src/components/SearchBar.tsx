// import { useDispatch, useSelector } from 'react-redux';
// import type { RootState, AppDispatch } from '../redux/store';
// import { setSearchTerm } from '../redux/filterSlice';

// interface SearchBarProps {
//   className?: string;
//   placeholder?: string;
// }

// const SearchBar = ({ className = '', placeholder = 'Search products by title...' }: SearchBarProps) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

//   return (
//     <div className={`w-full max-w-md ${className}`}>
//       <div className="relative">
//         <input
//           type="text"
//           placeholder={placeholder}
//           value={searchTerm}
//           onChange={(e) => {
//             console.log('Searching for:', e.target.value); // Debug log
//             dispatch(setSearchTerm(e.target.value));
//           }}
//           className="w-full px-4 py-3 pl-12 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
//         />
//         <svg
//           className="absolute left-4 top-3.5 h-5 w-5 text-gray-400"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
//           />
//         </svg>
//         {searchTerm && (
//           <button
//             onClick={() => dispatch(setSearchTerm(''))}
//             className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SearchBar;

import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { setSearchTerm } from '../redux/filterSlice';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

const SearchBar = ({ className = '', placeholder = 'Search products...' }: SearchBarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const searchTerm = useSelector((state: RootState) => state.filter.searchTerm);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleClear = (): void => {
    dispatch(setSearchTerm(''));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`relative ${className}`}
    >
      <div className="relative group">
        <motion.input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleChange}
          className="w-full px-5 py-3 pl-12 pr-12 bg-white/90 backdrop-blur-sm border-2 border-gray-200/70 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-400 shadow-lg hover:shadow-xl"
          whileFocus={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
        <svg
          className="absolute left-4 top-3.5 h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <AnimatePresence>
          {searchTerm && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleClear}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
              aria-label="Clear search"
            >
              ✕
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default SearchBar;