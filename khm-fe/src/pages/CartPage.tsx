import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import CartItem from "@/components/CartItem";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { IOrderRequest, IProduct } from "@/types/common";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllProducts } from "@/apis/product";
import toast from "react-hot-toast";
import { createOrder } from "@/apis/order";
import { ORDER, PRODUCT } from "@/utils/constants/queryKeys";

const CartPage = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const shippingCost = cartTotal > 100 ? 0 : 10;
  const discount = appliedCoupon ? cartTotal * 0.1 : 0;
  const totalAmount = cartTotal + shippingCost - discount;

  const { data: products, isLoading } = useQuery({
    queryKey: PRODUCT,
    queryFn: () => getAllProducts(""),
  });

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "discount10") {
      setAppliedCoupon(couponCode);
    } else {
      alert("Invalid coupon code");
    }
  };

  const formatCurrency = (amount: number) => {
    new Intl.NumberFormat("rw-RW", {
      style: "currency",
      currency: "RWF",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  useEffect(() => {
    if (!products?.data) return;

    const featuredProducts = products.data.filter((product) => product.isFeatured);

    setRecommendedProducts(featuredProducts);
  }, [products?.data]);
  const createOrderMutation = useMutation((data: IOrderRequest) => createOrder(data));

  const handleCheckoutClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);

    try {
      const orderItems = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      }));

      const requestBody = { orderItems };
      createOrderMutation.mutate(requestBody, {
        onSuccess(response) {
          const orderId = response?.id;
          const orderNumber = response?.orderNumber;
          if (orderId && orderNumber) {
            navigate(`/checkout?orderId=${orderId}&orderNumber=${orderNumber}`);
            queryClient.invalidateQueries(ORDER);
          } else {
            toast.error("Order created but no order ID or order number returned.");
          }
        },
        onError(error) {
          toast.error("Failed to create Order");
        },
        onSettled() {
          setIsProcessing(false);
        },
      });
    } catch (error) {
      console.error("Failed to create order:", error);
      toast.error("There was an error placing your order. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className='bg-gray-50 min-h-screen'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className='bg-white p-8 rounded-lg shadow-sm text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4'>
              <ShoppingBag className='h-8 w-8 text-gray-400' />
            </div>
            <h3 className='text-lg font-medium mb-2'>Your cart is empty</h3>
            <p className='text-gray-500 mb-6'>
              Looks like you haven't added any products to your cart yet.
            </p>
            <Button asChild>
              <Link to='/products'>Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
            {/* Cart items */}
            <div className='lg:col-span-2'>
              <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                <div className='p-6'>
                  <div className='flex justify-between border-b pb-4'>
                    <h2 className='text-lg font-medium'>
                      Cart Items ({cart.length})
                    </h2>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={clearCart}
                      className='text-red-500 hover:text-red-600 hover:bg-red-50'
                    >
                      Clear Cart
                    </Button>
                  </div>

                  <div className='divide-y'>
                    {cart.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        discountPercentage={item.discountPercentage}
                        quantity={item.quantity}
                        thumbnail={item.thumbnail}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Recommended products */}
              <div className='mt-8'>
                <h3 className='text-xl font-medium mb-4'>You Might Also Like</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {recommendedProducts.length === 0 ? (
                    <p className='text-gray-500'>No recommendations available</p>
                  ) : (
                    recommendedProducts.slice(0, 3).map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        className='group'
                      >
                        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
                          <div className='aspect-w-1 aspect-h-1 w-full overflow-hidden'>
                            <img
                              src={product.thumbnail}
                              alt={product.name}
                              className='w-full h-48 object-cover object-center group-hover:opacity-75 transition-opacity'
                            />
                          </div>
                          <div className='p-4'>
                            <h4 className='text-sm font-medium text-gray-900 group-hover:text-primary transition-colors truncate'>
                              {product.name}
                            </h4>
                            <p className='mt-1 text-sm text-gray-500 flex gap-1 items-end'>
                              {product.discountPercentage > 0 ? (
                                <>
                                  <span className='line-through text-[10px] opacity-40'>
                                    RWF{product.price.toFixed(2)}
                                  </span>
                                  <span>
                                    RWF
                                    {(
                                      product.price -
                                      (product.price * product.discountPercentage) /
                                        100
                                    ).toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <span>RWF {product.price.toFixed(2)}</span>
                                </>
                              )}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className='lg:col-span-1'>
              <div className='bg-white rounded-lg shadow-sm p-6 sticky top-20'>
                <h2 className='text-lg font-medium mb-6'>Order Summary</h2>

                <div className='space-y-4 text-sm'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Subtotal</span>
                    {/* <span className='font-medium'>RWF{cartTotal.toFixed(2)}</span> */}
                    <span className='font-medium'>{cartTotal.toFixed(2)}</span>
                  </div>

                  <div className='flex justify-between'>
                    <span className='text-gray-600'>Delivery fee</span>
                    <span>
                      {shippingCost === 0 ? "Free" : `RWF${shippingCost.toFixed(2)}`}
                    </span>
                  </div>

                  {/* {appliedCoupon && (
                    <div className='flex justify-between text-green-600'>
                      <span>Discount (10%)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )} */}

                  <div className='border-t pt-4 flex justify-between font-medium text-base'>
                    <span>Total</span>
                    <span>RWF{totalAmount.toFixed(2)}</span>
                  </div>
                </div>

              

                <Button
                  className='w-full mt-6 cursor-pointer'
                  onClick={handleCheckoutClick}
                  size='lg'
                  asChild
                  disabled={isProcessing}
                >
                  {isProcessing ? "Loading..." : (
                    <span>
                      Proceed to Checkout
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </span>
                  )}
                </Button>

                <div className='text-center mt-4'>
                  <Link
                    to='/products'
                    className='text-sm text-primary hover:underline'
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
