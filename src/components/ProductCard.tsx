// import { Link } from 'react-router-dom';
// import type { Product } from '../types/product';

// interface ProductCardProps {
//   product: Product;
// }

// const ProductCard = ({ product }: ProductCardProps) => {
//   return (
//     <Link to={`/product/${product.id}`} className="block">
//       <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full flex flex-col">
//         <div className="h-48 p-4 flex items-center justify-center bg-gray-50">
//           <img
//             src={product.image}
//             alt={product.title}
//             className="h-full object-contain"
//             onError={(e) => {
//               (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image';
//             }}
//           />
//         </div>
//         <div className="p-4 flex-1 flex flex-col">
//           <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2">
//             {product.title}
//           </h3>
//           <p className="text-lg font-bold text-blue-600 mb-2">
//             ${product.price.toFixed(2)}
//           </p>
//           <p className="text-sm text-gray-600 capitalize mb-2">
//             {product.category}
//           </p>
//           <div className="flex items-center mt-auto">
//             <span className="text-yellow-500">★</span>
//             <span className="text-sm font-medium ml-1">{product.rating.rate}</span>
//             <span className="text-xs text-gray-500 ml-1">
//               ({product.rating.count} reviews)
//             </span>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// };

// export default ProductCard;

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import type { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard = ({ product, index }: ProductCardProps) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>): void => {
    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 100 }}
      whileHover={{
        y: -8,
        transition: { type: 'spring', stiffness: 400, damping: 17 },
      }}
      whileTap={{ scale: 0.95 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block h-full">
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border border-gray-200/50 hover:border-blue-300/50">
          <div className="relative h-52 p-4 flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100/50 overflow-hidden">
            <motion.img
              whileHover={{ scale: 1.08 }}
              transition={{ duration: 0.4 }}
              src={product.image}
              alt={product.title}
              className="h-full object-contain"
              onError={handleImageError}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.05 + 0.2 }}
              className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg"
            >
              ⭐ {product.rating.rate}
            </motion.div>
            <div className="absolute bottom-3 left-3">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
              {product.title}
            </h3>
            <div className="flex items-center justify-between mt-auto">
              <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${product.price.toFixed(2)}
              </p>
              <motion.span
                whileHover={{ x: 5 }}
                className="text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
              <span className="text-yellow-500">★</span>
              <span>{product.rating.rate}</span>
              <span className="text-gray-400">•</span>
              <span>{product.rating.count} reviews</span>
            </div>
          </div>

          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-transparent pointer-events-none"
            whileHover={{
              borderColor: 'rgba(59, 130, 246, 0.5)',
            }}
          />
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;