import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 1, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1, repeat: Infinity, ease: 'easeInOut' },
          }}
          className="w-20 h-20 mx-auto mb-6"
        >
          <div className="w-full h-full rounded-full border-4 border-t-4 border-blue-600/20 border-t-blue-600"></div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg font-medium text-gray-600"
        >
          Loading products...
        </motion.p>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '100%' }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full max-w-[200px] mx-auto mt-4"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;