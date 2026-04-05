import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { IProduct } from "@/types/common";
import { formatNumberWithCommas } from "@/utils/formats/formats";

interface ProductCardProps {
  product: IProduct;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();

  const formatCategoryLabel = (category: string) => {
    const words = category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const displayWords = words.slice(0, 3).join(" ");
    return words.length > 3 ? `${displayWords} ..` : displayWords;
  };

  return (
    <div className='product-card flex flex-col h-full'>
      <Link
        to={`/product/${product.id}`}
        className='block overflow-hidden rounded-t-lg'
      >
        <div className='relative pb-[75%]'>
          <img
            src={product.thumbnail}
            alt={product.name}
            className='absolute inset-0 w-full h-full object-cover hover:scale-105 transition-transform duration-300'
          />
        </div>
      </Link>

      <div className='p-4 flex flex-col flex-grow'>
        <div className='flex justify-between items-start mb-2'>
          <div>
            <p className='text-sm text-gray-500 font-medium'>
              {formatCategoryLabel(product.category as string)}
            </p>
            <Link to={`/product/${product.id}`}>
              <h3 className='font-medium text-lg hover:text-primary transition-colors line-clamp-1'>
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <div className='flex items-center mt-1 mb-2'>
          <div className='flex items-center'>
            <Star className='w-4 h-4 text-yellow-400 fill-yellow-400' />
            <span className='ml-1 text-sm font-medium'>{product.rating}</span>
          </div>
          {product.stockQuantity <= 15 && (
            <span className='ml-auto text-xs text-red-500'>
              Only {product.stockQuantity} left
            </span>
          )}
        </div>

        <p className='text-sm text-gray-600 line-clamp-2 mb-4 flex-grow'>
          {product.teaser}{" "}
        </p>

        <div className='mt-auto flex items-end justify-between'>
          <span className='text-lg font-bold flex-col gap-1 items-center'>
            {product.discountPercentage > 0 ? (
              <>
                <div className='text-sm font-[400] opacity-30 line-through'>
                  RWF{formatNumberWithCommas(product.price)}
                </div>
                <div>
                  RWF
                  {formatNumberWithCommas(
                    product.price -
                    (product.price * product.discountPercentage) / 100
                  )}
                </div>
              </>
            ) : (
              <>
                <span> RWF{formatNumberWithCommas(product.price)}</span>
               </>
            )}
          </span>
          <Button
            size='sm'
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
          >
            <ShoppingCart className='h-4 w-4 ' />
            <span className="hidden sm:inline">Add to Cart</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
