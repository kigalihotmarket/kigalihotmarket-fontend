import { useState } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { getAllFeaturedProducts } from "@/apis/product";
import { PRODUCT } from "@/utils/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: PRODUCT,
    queryFn: () => getAllFeaturedProducts(""),
  });

  const [currentPage, setCurrentPage] = useState(0);
  const productsPerPage = 4;

  const pageCount = Math.ceil((products?.data?.length ?? 0) / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentProducts = products?.data?.slice(offset, offset + productsPerPage);

  const nextPage = () => setCurrentPage((p) => (p + 1) % pageCount);
  const prevPage = () => setCurrentPage((p) => (p - 1 + pageCount) % pageCount);

  return (
    <section className="section-container">
      {/* Section header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm font-semibold text-[#FF4913] uppercase tracking-wider mb-1">Hand-picked</p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Featured Products</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1 text-sm font-semibold text-[#FF4913] hover:underline mr-2"
          >
            See All <ArrowRight className="h-4 w-4" />
          </Link>
          <button
            onClick={prevPage}
            disabled={pageCount <= 1}
            className="h-9 w-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#FF4913] hover:text-[#FF4913] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextPage}
            disabled={pageCount <= 1}
            className="h-9 w-9 rounded-full border-2 border-gray-200 flex items-center justify-center hover:border-[#FF4913] hover:text-[#FF4913] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Page indicator dots */}
      {pageCount > 1 && (
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: pageCount }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentPage ? 'w-6 bg-[#FF4913]' : 'w-1.5 bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {isLoading
          ? Array.from({ length: productsPerPage }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : currentProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
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
    </section>
  );
};

export default FeaturedProducts;
