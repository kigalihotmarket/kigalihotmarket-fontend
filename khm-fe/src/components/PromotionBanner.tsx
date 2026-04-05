import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Clock, Percent, ArrowRight } from 'lucide-react';

const PromotionBanner = () => {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Main promo */}
          <div
            className="relative rounded-2xl overflow-hidden p-8 md:p-10 flex flex-col justify-between min-h-[260px]"
            style={{ background: 'linear-gradient(135deg, #016e52 0%, #108474 100%)' }}
          >
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-3 py-1 text-white text-xs font-semibold">
                <Clock className="h-3.5 w-3.5" />
                Limited Time Offer
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight">
                Summer Sale<br />
                <span className="text-yellow-300">Up to 40% OFF</span>
              </h2>
              <p className="text-white/80 text-sm max-w-xs">
                Don't miss out — grab your favorite items at the lowest prices of the season.
              </p>
              <Button
                size="lg"
                className="bg-white text-[#016e52] hover:bg-yellow-50 font-bold"
                asChild
              >
                <Link to="/products">
                  Shop the Sale <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* Decorative circle */}
            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full" />
            <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full" />
          </div>

          {/* Secondary promo */}
          <div className="grid grid-rows-2 gap-6">
            <div
              className="relative rounded-2xl overflow-hidden p-6 flex items-center gap-6 min-h-[116px]"
              style={{ background: 'linear-gradient(135deg, #FF4913 0%, #e63900 100%)' }}
            >
              <div className="flex-shrink-0 bg-white/20 rounded-full p-3">
                <Percent className="h-8 w-8 text-white" />
              </div>
              <div className="text-white">
                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">New Arrivals</p>
                <h3 className="text-xl font-extrabold leading-tight">Fresh Drops Every Week</h3>
                <Link to="/products" className="text-sm font-semibold text-yellow-300 hover:text-yellow-100 flex items-center gap-1 mt-1">
                  Explore <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
            </div>

            <div
              className="relative rounded-2xl overflow-hidden p-6 flex items-center gap-6 min-h-[116px]"
              style={{ background: 'linear-gradient(135deg, #583730 0%, #7a4d44 100%)' }}
            >
              <div className="flex-shrink-0 bg-white/20 rounded-full p-3">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <div className="text-white">
                <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Flash Deals</p>
                <h3 className="text-xl font-extrabold leading-tight">Daily Deals End Tonight</h3>
                <Link to="/products" className="text-sm font-semibold text-yellow-300 hover:text-yellow-100 flex items-center gap-1 mt-1">
                  Grab Deals <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromotionBanner;
