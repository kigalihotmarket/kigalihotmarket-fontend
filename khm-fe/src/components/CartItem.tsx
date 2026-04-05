import { ChevronUp, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";
import { formatNumberWithCommas } from "@/utils/formats/formats";

interface CartItemProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  thumbnail: string;
  discountPercentage: number;
}

const CartItem = ({
  id,
  name,
  price,
  discountPercentage,
  quantity,
  thumbnail,
}: CartItemProps) => {
  const { updateQuantity, removeFromCart } = useCart();

  const increaseQuantity = () => {
    updateQuantity(id, quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    } else {
      removeFromCart(id);
    }
  };

  const offerPrice = price - (price * discountPercentage) / 100;

  return (
    <div className='flex py-6 border-b'>
      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border'>
        <img
          src={thumbnail}
          alt={name}
          className='h-full w-full object-cover object-center'
        />
      </div>

      <div className='ml-4 flex flex-1 flex-col'>
        <div>
          <div className='flex justify-between text-base font-medium text-gray-900'>
            <Link to={`/product/${id}`}>
              <h3 className='hover:text-primary transition-colors'>{name}</h3>
            </Link>
            <p className='ml-4'>RWF{formatNumberWithCommas(offerPrice * quantity)}</p>
          </div>
          <p className='mt-1 text-sm text-gray-500'>
            Price: RWF{formatNumberWithCommas(offerPrice)} each
          </p>
        </div>

        <div className='flex flex-1 items-end justify-between text-sm'>
          <div className='flex items-center space-x-3'>
            <p className='text-gray-500'>Qty</p>
            <div className='flex items-center border rounded'>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-none'
                onClick={decreaseQuantity}
              >
                <ChevronDown className='h-4 w-4' />
              </Button>
              <span className='px-2 py-1 min-w-[2rem] text-center'>{quantity}</span>
              <Button
                variant='ghost'
                size='icon'
                className='h-8 w-8 rounded-none'
                onClick={increaseQuantity}
              >
                <ChevronUp className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <Button
            variant='ghost'
            onClick={() => removeFromCart(id)}
            className='text-red-500 hover:text-red-600 hover:bg-red-50'
          >
            <X className='h-4 w-4 mr-1' />
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
