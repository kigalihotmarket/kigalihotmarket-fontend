import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ShoppingCart,
  Star,
  Check,
  Minus,
  Plus,
  ArrowRight,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "@/apis/product";
import SyncLoader from "react-spinners/SyncLoader";
import { formatNumberWithCommas } from "@/utils/formats/formats";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["PRODUCT_DETAIL", id],
    queryFn: () => getProductById(id!),
    enabled: !!id,
  });

  const offerPrice =
    product?.price &&
    product.price - (product.price * product.discountPercentage) / 100;

  if (isLoading) {
    return (
      <>
        <div className='flex justify-center mb-3 mt-6'>
          <SyncLoader color='#3474dd' />
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <div className='p-8 text-center text-red-500'>Product not found</div>
      </>
    );
  }

  const formatCategoryLabel = (category: string) => {
    const words = category
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());

    const displayWords = words.slice(0, 3).join(" ");
    return words.length > 3 ? `${displayWords} ..` : displayWords;
  };

  // Redirect to 404 if product is not found
  if (!product) {
    navigate("/404");
    return null;
  }

  // Mock additional images
  const additionalImages = [product.thumbnail, ...(product.galleryImages || [])];

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= product.stockQuantity) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className='bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Breadcrumb */}
        <nav className='flex items-center text-sm font-medium text-gray-500 mb-8'>
          <a href='/' className='hover:text-gray-900'>
            Home
          </a>
          <ChevronRight className='h-4 w-4 mx-2' />
          <a href='/products' className='hover:text-gray-900'>
            Products
          </a>
          <ChevronRight className='h-4 w-4 mx-2' />
          <a
            href={`/products?category=${product.category}`}
            className='hover:text-gray-900'
          >
            {formatCategoryLabel(product.category as string)}
          </a>
          <ChevronRight className='h-4 w-4 mx-2' />
          <span className='text-gray-900'>{product.name}</span>
        </nav>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10'>
          {/* Product Gallery */}
          <div className='space-y-4'>
            <div className='aspect-w-1 aspect-h-1 bg-gray-100 rounded-lg overflow-hidden'>
              <img
                src={additionalImages[activeImageIndex]}
                alt={product.name}
                className='w-full h-96 object-center object-cover'
              />
            </div>
            <div className='grid grid-cols-3 gap-4'>
              {additionalImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`aspect-w-1 aspect-h-1 rounded-md overflow-hidden ${
                    activeImageIndex === index
                      ? "ring-2 ring-primary"
                      : "ring-1 ring-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - View ${index + 1}`}
                    className='w-full h-full object-center object-cover'
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className='space-y-6'>
            <div>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
                {product.name}
              </h1>
              <div className='mt-3 flex items-center'>
                <div className='flex items-center'>
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className='ml-2 text-sm text-gray-500'>
                  {product.rating} out of 5 stars
                </span>
              </div>
            </div>

            <div>
              <p className='text-3xl font-bold text-gray-900 flex items-end space-x-2'>
                <span className='line-through text-xl opacity-40'>
                  RWF{formatNumberWithCommas(product.price)}
                </span>
                <span>RWF{formatNumberWithCommas(offerPrice)}</span>
              </p>
              <p className='text-sm text-gray-500 mt-1'>
                Free delivery on orders over RWF100,000
              </p>
            </div>

            <div className='border-t border-b py-4'>
              <div className='prose prose-sm text-gray-700'>
                <p>{product.teaser}</p>
              </div>
            </div>

            {/* Stock status */}
            <div className='flex items-center'>
              {product.stockQuantity > 0 ? (
                <>
                  <div className='flex-shrink-0 h-5 w-5 text-green-500'>
                    <Check className='h-5 w-5' />
                  </div>
                  <p className='ml-2 text-sm text-green-700'>
                    {product.stockQuantity <= 5
                      ? `Only ${product.stockQuantity} units left!`
                      : "In stock and ready to ship"}
                  </p>
                </>
              ) : (
                <p className='text-sm text-red-600'>Out of stock</p>
              )}
            </div>

            {/* Quantity selector and Add to cart */}
            <div className='space-y-4'>
              <div className='space-y-2'>
                <Label htmlFor='quantity'>Quantity</Label>
                <div className='flex items-center'>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-10 w-10 rounded-r-none'
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className='h-4 w-4' />
                  </Button>
                  <div className='px-4 py-2 w-16 text-center border-y'>
                    {quantity}
                  </div>
                  <Button
                    variant='outline'
                    size='icon'
                    className='h-10 w-10 rounded-l-none'
                    onClick={() => handleQuantityChange(quantity + 1)}
                    disabled={quantity >= product.stockQuantity}
                  >
                    <Plus className='h-4 w-4' />
                  </Button>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <Button
                  className='w-full'
                  onClick={handleAddToCart}
                  disabled={product.stockQuantity <= 0}
                >
                  <ShoppingCart className='mr-2 h-4 w-4' />
                  Add to Cart
                </Button>
                <Button
                  variant='secondary'
                  className='w-full cursor-pointer'
                  onClick={() => {
                    addToCart(product, quantity);
                    navigate("/cart");
                  }}
                  disabled={product.stockQuantity <= 0}
                  asChild
                >
                  <span>
                    Buy Now
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </span>
                </Button>
              </div>
            </div>

            {/* Product information tabs */}
            <Tabs defaultValue='details' className='mt-8'>
              <TabsList className='grid grid-cols-3 w-full'>
                <TabsTrigger value='details'>Details</TabsTrigger>
                <TabsTrigger value='specs'>Specifications</TabsTrigger>
                <TabsTrigger value='reviews'>Reviews</TabsTrigger>
              </TabsList>
              <TabsContent
                value='details'
                className='mt-4 prose prose-sm max-w-none'
              >
                <p>{product.description}</p>
              </TabsContent>
              <TabsContent value='specs' className='mt-4'>
                <div className='text-sm'>
                  <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className='border rounded-lg overflow-hidden'>
                      <div className='px-4 py-2 bg-gray-50 font-medium'>
                        Features
                      </div>
                      <ul className='px-4 py-2 space-y-1'>
                        {[
                          product?.featuresOne,
                          product?.featuresTwo,
                          product?.featuresThree,
                          product?.featuresFour,
                          product?.featuresFive,
                          product?.featuresFix,
                          product?.featuresSeven,
                          product?.featuresEight,
                          product?.featuresNine,
                          product?.featuresTen,
                        ]
                          .filter((feature) => feature)
                          .map((feature, index) => (
                            <li key={index} className='capitalize'>• {feature}</li>
                          ))}
                      </ul>
                    </div>
                    <div className='border rounded-lg overflow-hidden'>
                      <div className='px-4 py-2 bg-gray-50 font-medium'>Details</div>
                      <ul className='px-4 py-2 space-y-1'>
                        <li>
                          Brand: <i>{product.brand}</i>
                        </li>
                        <li>
                          Model: <i>{product.model}</i>
                        </li>
                        <li>
                          Warranty: <i>{product.warranty}</i>
                        </li>
                        <li>
                          Category:{" "}
                          <i>{formatCategoryLabel(product.category as string)}</i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value='reviews' className='mt-4'>
                <div className='space-y-4'>
                  <div className='flex items-center justify-between'>
                    <h3 className='text-lg font-medium'>Customer Reviews</h3>
                    <Button variant='outline' size='sm'>
                      Write a review
                    </Button>
                  </div>

                  <div className='space-y-4'>
                    <div className='border-b pb-4'>
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          <div className='flex'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 5
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className='ml-2 text-sm font-medium'>Jane D.</span>
                        </div>
                        <span className='text-sm text-gray-500'>2 months ago</span>
                      </div>
                      <p className='mt-2 text-sm text-gray-600'>
                        This product exceeded my expectations! Great quality and it
                        arrived faster than I expected.
                      </p>
                    </div>

                    <div className='border-b pb-4'>
                      <div className='flex justify-between'>
                        <div className='flex items-center'>
                          <div className='flex'>
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className='ml-2 text-sm font-medium'>John S.</span>
                        </div>
                        <span className='text-sm text-gray-500'>1 month ago</span>
                      </div>
                      <p className='mt-2 text-sm text-gray-600'>
                        Good product overall. It does what it's supposed to do. Would
                        recommend.
                      </p>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
