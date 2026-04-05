import { Link } from "react-router-dom";
import { IProduct } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/product";
import { PRODUCT } from "@/utils/constants/queryKeys";
import { ArrowRight } from "lucide-react";

const CategorySection = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: PRODUCT,
    queryFn: () => getAllProducts(""),
  });

  const categoryMap: Record<string, IProduct> = {};
  products?.data?.forEach((product) => {
    const categoryKey = product.category.toString();
    if (!categoryMap[categoryKey]) {
      categoryMap[categoryKey] = product;
    }
  });

  const categoriesWithProducts = Object.entries(categoryMap);

  return (
    <section id="categories" className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-sm font-semibold text-[#FF4913] uppercase tracking-wider mb-1">Explore</p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Shop by Category</h2>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#FF4913] hover:underline"
          >
            All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl aspect-square mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                </div>
              ))
            : categoriesWithProducts.map(([category, product]) => (
                <Link
                  key={category}
                  to={`/products?category=${category}`}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100 group-hover:shadow-md group-hover:border-[#FF4913]/30 transition-all duration-300 mb-3">
                    <img
                      src={product.thumbnail}
                      alt={category}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="bg-[#FF4913] text-white text-xs font-bold px-3 py-1 rounded-full">
                        Shop Now
                      </span>
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#FF4913] transition-colors leading-tight">
                    {category.replace(/_/g, " ")}
                  </h3>
                </Link>
              ))}
        </div>

        <div className="mt-6 sm:hidden text-center">
          <Link
            to="/products"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[#FF4913] hover:underline"
          >
            View All Products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
