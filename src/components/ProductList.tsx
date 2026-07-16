// import type { Product } from '../types/product';
// import ProductCard from './ProductCard';

// interface ProductListProps {
//   products: Product[];
// }

// const ProductList = ({ products }: ProductListProps) => {
//   if (products.length === 0) {
//     return (
//       <div className="text-center py-16">
//         <p className="text-gray-500 text-lg">
//           No products found matching your criteria
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {products.map((product) => (
//         <ProductCard key={product.id} product={product} />
//       ))}
//     </div>
//   );
// };

// export default ProductList;


import { motion } from 'framer-motion';
import type { Product } from '../types/product';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
}

const ProductList = ({ products }: ProductListProps) => {
  if (products.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20"
      >
        <div className="text-6xl mb-4">🔍</div>
        <p className="text-2xl font-semibold text-gray-700 mb-2">
          No products found
        </p>
        <p className="text-gray-500">
          Try adjusting your search or filter criteria
        </p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </div>
  );
};

export default ProductList;