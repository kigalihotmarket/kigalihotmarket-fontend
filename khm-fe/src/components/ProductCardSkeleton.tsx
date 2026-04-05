// ProductCardSkeleton.tsx
const ProductCardSkeleton = () => {
  return (
    <div className="product-card animate-pulse flex flex-col h-full bg-white rounded-lg shadow p-4">
      <div className="bg-gray-200 rounded-lg w-full h-48 mb-4"></div>

      <div className="space-y-2 flex-grow">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-5 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-100 rounded w-full"></div>
        <div className="h-4 bg-gray-100 rounded w-2/3"></div>
      </div>

      <div className="flex justify-between items-center mt-auto pt-4">
        <div className="h-6 w-16 bg-gray-200 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
