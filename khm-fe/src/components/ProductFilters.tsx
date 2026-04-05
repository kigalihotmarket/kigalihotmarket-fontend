import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { categories } from "@/data/products";

interface ProductFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  minRating: number;
}

const ProductFilters = ({
  filters = { categories: [], priceRange: [0, 100000000], minRating: 0 },
  onFilterChange,
}: ProductFiltersProps) => {
  const handleCategoryChange = (category: string, checked: boolean) => {
    const updatedCategories = checked
      ? [...filters.categories, category]
      : filters.categories.filter((c) => c !== category);

    onFilterChange({
      ...filters,
      categories: updatedCategories,
    });
  };

  const handlePriceChange = (value: number[]) => {
    const newPriceRange: [number, number] = [
      value[0],
      value[1] || filters.priceRange[1],
    ];
    onFilterChange({
      ...filters,
      priceRange: newPriceRange,
    });
  };

  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: rating,
    });
  };

  const formatCategoryLabel = (category: string) => {
    const words = category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const displayWords = words.slice(0, 3).join(" ");
    return words.length > 3 ? `${displayWords} ..` : displayWords;
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

  return (
    <div className='space-y-6'>
      <div>
        <h3 className='text-lg font-medium mb-3'>Categories</h3>
        <div className='space-y-2'>
          {categories.map((category) => (
            <div key={category} className='flex items-center space-x-2'>
              <Checkbox
                id={`category-${category}`}
                checked={filters.categories.includes(category)}
                onCheckedChange={(checked) =>
                  handleCategoryChange(category, checked === true)
                }
              />
              <Label htmlFor={`category-${category}`}>
                {formatCategoryLabel(category)}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-3'>Price Range</h3>
        <div className='px-2'>
          <Slider
            value={[filters.priceRange[0], filters.priceRange[1]]}
            max={100000000}
            step={1000}
            onValueChange={handlePriceChange}
            className='mb-6'
          />
          <div className='flex justify-between text-sm'>
            <span>RWF {formatPrice(filters.priceRange[0])}</span>
            <span>RWF {formatPrice(filters.priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className='text-lg font-medium mb-3'>Minimum Rating</h3>
        <div className='flex items-center space-x-1'>
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              className={`p-1 ${
                filters.minRating >= rating ? "text-yellow-400" : "text-gray-300"
              }`}
              onClick={() => handleRatingChange(rating)}
            >
              ★
            </button>
          ))}
          <span className='ml-2 text-sm'>& Up</span>
        </div>
      </div>
    </div>
  );
};

export default ProductFilters;