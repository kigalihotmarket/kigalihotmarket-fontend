import HeroBanner from "@/components/HeroBanner";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategorySection from "@/components/CategorySection";
import PromotionBanner from "@/components/PromotionBanner";
import Testimonials from "@/components/Testimonials";
import { CheckCircle, Clock, RotateCcw, Headphones } from "lucide-react";

const trustFeatures = [
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "Every product is verified by our team before listing.",
    color: "text-[#016e52]",
    bg: "bg-[#016e52]/10",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description: "Same-day delivery available across Kigali.",
    color: "text-[#FF4913]",
    bg: "bg-orange-50",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "Hassle-free returns within 7 days of purchase.",
    color: "text-[#583730]",
    bg: "bg-[#583730]/10",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Our team is always here to help you.",
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
];

const HomePage = () => {
  return (
    <div>
      <HeroBanner />

      <FeaturedProducts />

      <div id="categories">
        <CategorySection />
      </div>

      <PromotionBanner />

      {/* Brand showcase */}
      <section className="py-10 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <img
            src="/images/brand/khm-billboard.jpeg"
            alt="Kigali Hot Market — Online Shopping, Logistics, Car Sales & More"
            className="w-full rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* Trust features */}
      <section className="py-14 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustFeatures.map(({ icon: Icon, title, description, color, bg }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-xl border border-gray-100 hover:shadow-md transition-shadow duration-300 bg-white">
                <div className={`flex-shrink-0 ${bg} rounded-xl p-3`}>
                  <Icon className={`h-6 w-6 ${color}`} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
    </div>
  );
};

export default HomePage;
