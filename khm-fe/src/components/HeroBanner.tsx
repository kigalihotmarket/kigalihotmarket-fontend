import { useEffect, useState, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Star, ShoppingCart, Truck, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getAllFeaturedProducts } from '@/apis/product';
import { PRODUCT } from '@/utils/constants/queryKeys';
import { formatNumberWithCommas } from '@/utils/formats/formats';
import { useCart } from '@/contexts/CartContext';

const HeroBanner = () => {
  const { data: products } = useQuery({
    queryKey: PRODUCT,
    queryFn: () => getAllFeaturedProducts(''),
  });
  const { addToCart } = useCart();

  const slides = products?.data?.slice(0, 6) ?? [];

  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 500);
    },
    [isTransitioning]
  );

  const prev = () => goTo((current - 1 + slides.length) % slides.length);
  const next = useCallback(() => goTo((current + 1) % slides.length), [current, slides.length, goTo]);

  // Auto-advance every 2 s
  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(next, 2000);
    return () => clearInterval(id);
  }, [slides.length, next]);

  const active = slides[current];

  return (
    <div className="w-full">
      {/* ── Full-width hero slideshow ── */}
      <div
        className="relative overflow-hidden bg-gray-900"
        style={{ minHeight: '480px' }}
      >
        {/* Slides */}
        {slides.length === 0 ? (
          /* Loading skeleton */
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-800 to-gray-700" />
        ) : (
          slides.map((product, i) => (
            <div
              key={product.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              {/* Background product image */}
              <img
                src={product.thumbnail}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Dark + brand-colored overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div
                className="absolute inset-0 opacity-20"
                style={{ background: 'linear-gradient(135deg, #FF4913 0%, transparent 60%)' }}
              />
            </div>
          ))
        )}

        {/* Content (always on top) */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center" style={{ minHeight: '480px' }}>
          <div className="py-16 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: product info */}
            <div className="text-white space-y-4">
              {active && (
                <>
                  <div className="flex items-center gap-2">
                    <span className="bg-[#FF4913] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                      {String(active.category).replace(/_/g, ' ')}
                    </span>
                    {active.discountPercentage > 0 && (
                      <span className="bg-yellow-400 text-gray-900 text-xs font-bold px-3 py-1 rounded-full">
                        -{active.discountPercentage}% OFF
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight drop-shadow-lg">
                    {active.name}
                  </h1>

                  <p className="text-white/75 text-base max-w-md line-clamp-2">
                    {active.teaser}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < Math.round(active.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-white/30 fill-white/30'}`}
                      />
                    ))}
                    <span className="text-white/70 text-sm ml-1">{active.rating} / 5</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-yellow-300">
                      RWF {formatNumberWithCommas(
                        active.discountPercentage > 0
                          ? active.price - (active.price * active.discountPercentage) / 100
                          : active.price
                      )}
                    </span>
                    {active.discountPercentage > 0 && (
                      <span className="text-white/50 text-lg line-through">
                        RWF {formatNumberWithCommas(active.price)}
                      </span>
                    )}
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3 pt-1">
                    <Button
                      size="lg"
                      className="bg-[#FF4913] hover:bg-orange-600 text-white font-bold shadow-lg"
                      asChild
                    >
                      <Link to={`/product/${active.id}`}>
                        View Product <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white/10 border-white text-white hover:bg-white/20 font-semibold backdrop-blur-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(active);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>

                  {/* Trust tags */}
                  <div className="flex flex-wrap gap-4 pt-1">
                    <span className="flex items-center gap-1.5 text-white/70 text-sm">
                      <Truck className="h-4 w-4 text-yellow-400" />
                      Free Delivery Over 50K
                    </span>
                    <span className="flex items-center gap-1.5 text-white/70 text-sm">
                      <Shield className="h-4 w-4 text-yellow-400" />
                      Secure Payment
                    </span>
                  </div>
                </>
              )}

              {/* Loading state text */}
              {slides.length === 0 && (
                <div className="space-y-3 animate-pulse">
                  <div className="h-4 bg-white/20 rounded w-24" />
                  <div className="h-10 bg-white/20 rounded w-3/4" />
                  <div className="h-4 bg-white/20 rounded w-1/2" />
                  <div className="h-8 bg-white/20 rounded w-40" />
                </div>
              )}
            </div>

            {/* Right: thumbnail strip (desktop only) */}
            {slides.length > 1 && (
              <div className="hidden lg:flex flex-col items-end gap-2">
                {slides.map((product, i) => (
                  <button
                    key={product.id}
                    onClick={() => goTo(i)}
                    className={`flex items-center gap-3 p-2 pr-4 rounded-xl transition-all duration-300 text-left w-64 ${
                      i === current
                        ? 'bg-white shadow-xl scale-100'
                        : 'bg-black/30 backdrop-blur-sm scale-95 hover:bg-black/50'
                    }`}
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="h-12 w-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="overflow-hidden">
                      <p className={`text-xs font-bold line-clamp-1 ${i === current ? 'text-gray-900' : 'text-white'}`}>
                        {product.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${i === current ? 'text-[#FF4913]' : 'text-yellow-300'} font-semibold`}>
                        RWF {formatNumberWithCommas(
                          product.discountPercentage > 0
                            ? product.price - (product.price * product.discountPercentage) / 100
                            : product.price
                        )}
                      </p>
                    </div>
                    {i === current && (
                      <div className="ml-auto w-1.5 h-6 bg-[#FF4913] rounded-full flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Prev / Next arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full h-10 w-10 flex items-center justify-center transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white rounded-full h-10 w-10 flex items-center justify-center transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Bottom dot indicators + progress bar */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? 'w-8 bg-[#FF4913]' : 'w-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        )}

        {/* Auto-play progress bar */}
        {slides.length > 1 && (
          <div className="absolute bottom-0 left-0 z-30 h-0.5 bg-[#FF4913]"
            style={{ animation: 'progress 2s linear infinite' }}
          />
        )}
      </div>

      {/* Quick category pills */}
      <div className="bg-white border-b border-gray-100 py-3 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 whitespace-nowrap">
            <span className="text-sm font-semibold text-gray-500 mr-2">Shop by:</span>
            {[
              { label: 'Mens Fashion', slug: 'MENS_FASHION' },
              { label: 'Sports & Equipment', slug: 'SPORTS_EQUIPMENT' },
              { label: 'Health & Beauty', slug: 'HEALTH_AND_BEAUTY' },
            ].map(({ label, slug }) => (
              <Link
                key={slug}
                to={`/products?category=${slug}`}
                className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-orange-50 text-[#FF4913] hover:bg-[#FF4913] hover:text-white border border-[#FF4913]/20 hover:border-[#FF4913] transition-all duration-200"
              >
                {label}
              </Link>
            ))}
            <Link
              to="/products"
              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors ml-2"
            >
              View All <ArrowRight className="h-3.5 w-3.5 ml-1" />
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes progress {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default HeroBanner;
