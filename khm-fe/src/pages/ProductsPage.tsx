import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import ProductFilters, { FilterOptions } from "@/components/ProductFilters";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/product";
import SyncLoader from "react-spinners/SyncLoader";
import { IProduct } from "@/types/common";

const ProductsPage = () => {
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
  const [sortOption, setSortOption] = useState<string>("all");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: [0, 100000000],
    minRating: 0,
  });
  const [searchQuery, setSearchQuery] = useState('');

  const location = useLocation();

  // Extract category / search from URL query params
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const categoryParam = query.get("category");
    const searchParam = query.get("search");

    if (categoryParam) {
      setFilters((prev) => ({ ...prev, categories: [categoryParam] }));
    }
    setSearchQuery(searchParam ?? '');
  }, [location.search]);

  // Fetch first page to get totalItems, then fetch all remaining pages
  const { data: firstPage, isLoading } = useQuery({
    queryKey: ["PRODUCT_ALL"],
    queryFn: () => getAllProducts("?page=1&size=100"),
  });

  const [allProducts, setAllProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    if (!firstPage) return;

    const total = firstPage.totalItems;
    const perPage = firstPage.itemsPerPage || 100;
    const totalPages = Math.ceil(total / perPage);

    if (totalPages <= 1) {
      setAllProducts(firstPage.data);
      return;
    }

    // Fetch remaining pages in parallel
    const pagePromises = Array.from({ length: totalPages - 1 }, (_, i) =>
      getAllProducts(`?page=${i + 2}&size=${perPage}`)
    );

    Promise.all(pagePromises).then((results) => {
      const extra = results.flatMap((r) => r.data);
      setAllProducts([...firstPage.data, ...extra]);
    });
  }, [firstPage]);

  const products = { data: allProducts };

  // Apply filters and sorting
  useEffect(() => {
    if (!allProducts.length) return;

    let result = [...allProducts];

    // Apply search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(q) ||
          product.teaser?.toLowerCase().includes(q) ||
          String(product.category).toLowerCase().includes(q) ||
          product.brand?.toLowerCase().includes(q),
      );
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(String(product.category)),
      );
    }

    // Apply price filter
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1],
    );

    // Apply rating filter
    if (filters.minRating > 0) {
      result = result.filter((product) => product.rating >= filters.minRating);
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "featured":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
      default:
        break;
    }

    setFilteredProducts(result);
  }, [allProducts, filters, sortOption, searchQuery]);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      categories: [],
      priceRange: [0, 500000],
      minRating: 0,
    });
    setSortOption("all");
    setSearchQuery('');
  };

  function formatPrice(num: number) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, "") + "B";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    } else if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    } else {
      return num.toString();
    }
  }

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 500000 ||
    filters.minRating > 0 ||
    searchQuery.trim().length > 0;

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold mb-6'>All Products</h1>

        <div className='flex flex-col lg:flex-row gap-8'>
          {/* Filters - Desktop */}
          <div className='hidden lg:block w-64 flex-shrink-0'>
            <div className='bg-white p-6 rounded-lg shadow-sm sticky top-20'>
              <div className='flex justify-between items-center mb-6'>
                <h2 className='text-lg font-medium'>Filters</h2>
                {hasActiveFilters && (
                  <Button variant='ghost' size='sm' onClick={clearFilters}>
                    Clear All
                  </Button>
                )}
              </div>
              <ProductFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </div>

          {/* Main Content */}
          <div className='flex-1'>
            <div className='bg-white p-4 rounded-lg shadow-sm mb-6'>
              <div className='flex flex-wrap items-center justify-between gap-4'>
                <div className='flex items-center'>
                  <span className='text-sm text-gray-500 mr-2'>
                    {filteredProducts.length} products
                  </span>
                  <Button
                    variant='outline'
                    size='sm'
                    className='lg:hidden'
                    onClick={() => setIsFilterVisible(!isFilterVisible)}
                  >
                    {isFilterVisible ? "Hide Filters" : "Show Filters"}
                  </Button>
                </div>

                <div className='flex items-center'>
                  <span className='text-sm mr-2'>Sort by:</span>
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                    className='border-gray-200 rounded text-sm'
                  >
                    <option value='all'>All</option>
                    <option value='featured'>Featured</option>
                    <option value='price-low'>Price: Low to High</option>
                    <option value='price-high'>Price: High to Low</option>
                    <option value='rating'>Highest Rated</option>
                  </select>
                </div>
              </div>

              {/* Active filters */}
              {hasActiveFilters && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {searchQuery.trim() && (
                    <div className='bg-orange-100 text-[#FF4913] text-sm rounded-full px-3 py-1 flex items-center gap-1 font-medium'>
                      Search: "{searchQuery}"
                      <button onClick={() => setSearchQuery('')} className='ml-1 hover:text-orange-700'>
                        <X size={14} />
                      </button>
                    </div>
                  )}
                  {filters.categories.map((category) => (
                    <div
                      key={category}
                      className='bg-gray-100 text-sm rounded-full px-3 py-1 flex items-center'
                    >
                      {category}
                      <button
                        onClick={() => {
                          setFilters((prev) => ({
                            ...prev,
                            categories: prev.categories.filter(
                              (c) => c !== category,
                            ),
                          }));
                        }}
                        className='ml-1 text-gray-500 hover:text-gray-700'
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}

                  {(filters.priceRange[0] > 0 || filters.priceRange[1] < 1000000) && (
                    <div className='bg-gray-100 text-sm rounded-full px-3 py-1'>
                      RWF{formatPrice(filters.priceRange[0])} - RWF{formatPrice(filters.priceRange[1])}
                    </div>
                  )}

                  {filters.minRating > 0 && (
                    <div className='bg-gray-100 text-sm rounded-full px-3 py-1'>
                      {filters.minRating}+ Stars
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile filters */}
            {isFilterVisible && (
              <div className='lg:hidden bg-white p-4 rounded-lg shadow-sm mb-6'>
                <div className='flex justify-between items-center mb-4'>
                  <h2 className='text-lg font-medium'>Filters</h2>
                  {hasActiveFilters && (
                    <Button variant='ghost' size='sm' onClick={clearFilters}>
                      Clear All
                    </Button>
                  )}
                </div>
                <ProductFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                />
              </div>
            )}

            {isLoading && (
              <div className='flex justify-center py-12'>
                <SyncLoader color='#FF4913' />
              </div>
            )}

            {/* All products — no pagination */}
            {filteredProducts.length > 0 && (
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {!isLoading && filteredProducts.length === 0 && (
              <div className='bg-white p-8 rounded-lg shadow-sm text-center'>
                <h3 className='text-lg font-medium mb-2'>No products found</h3>
                <p className='text-gray-500 mb-4'>
                  Try adjusting your filters to find what you're looking for.
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;
