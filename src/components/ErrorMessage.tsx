import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  const handleRetry = (): void => {
    if (onRetry) {
      onRetry();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[400px] p-8"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-md w-full border border-red-200/50">
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-6xl text-center mb-4"
        >
          😅
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-800 text-center mb-2">
          Oops! Something went wrong
        </h3>
        <p className="text-gray-600 text-center mb-6">{message}</p>
        {onRetry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRetry}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Try Again 🔄
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default ErrorMessage;