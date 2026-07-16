const EmptyState = () => {
  return (
    <div className="text-center py-20">
      <h2 className="text-2xl font-semibold text-gray-600">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-2">
        Try changing your search or category.
      </p>
    </div>
  );
};

export default EmptyState;