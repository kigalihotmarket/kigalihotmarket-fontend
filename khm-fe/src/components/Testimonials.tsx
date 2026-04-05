import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Amina K.",
    location: "Kigali, Rwanda",
    avatar: "AK",
    rating: 5,
    text: "Kigali Hot Market has completely changed how I shop. The quality of products is outstanding and delivery was faster than expected. I'm a customer for life!",
    product: "Electronics",
  },
  {
    name: "Jean-Paul M.",
    location: "Musanze, Rwanda",
    avatar: "JP",
    rating: 5,
    text: "The best online marketplace in Rwanda. I ordered furniture and it arrived in perfect condition. The customer support team was incredibly helpful throughout.",
    product: "Furniture",
  },
  {
    name: "Claudine U.",
    location: "Huye, Rwanda",
    avatar: "CU",
    rating: 5,
    text: "Amazing experience from browsing to delivery. The prices are competitive and the product selection is huge. I recommend KHM to everyone I know.",
    product: "Fashion",
  },
  {
    name: "Eric N.",
    location: "Rubavu, Rwanda",
    avatar: "EN",
    rating: 4,
    text: "Very reliable platform with authentic products. I've made multiple purchases and every single one has been a great experience. Trust KHM completely.",
    product: "Fitness",
  },
];

const avatarColors = [
  "from-orange-500 to-red-500",
  "from-[#016e52] to-[#108474]",
  "from-[#583730] to-[#7a4d44]",
  "from-yellow-500 to-orange-500",
];

const Testimonials = () => {
  return (
    <section className="bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#FF4913] uppercase tracking-wider mb-2">
            What customers say
          </p>
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900">Loved by thousands across Rwanda</h2>
          <p className="text-gray-500 mt-2 text-sm">Real reviews from real customers</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto mb-10">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "98%", label: "Satisfaction Rate" },
          ].map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map(({ name, location, avatar, rating, text, product }, i) => (
            <div
              key={name}
              className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-4 hover:shadow-lg hover:border-[#FF4913]/20 transition-all duration-300"
            >
              <div className="flex items-start justify-between">
                <Quote className="h-6 w-6 text-[#FF4913]/20 fill-[#FF4913]/10" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, si) => (
                    <Star
                      key={si}
                      className={`h-3.5 w-3.5 ${
                        si < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 fill-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-sm text-gray-500 leading-relaxed flex-grow">
                "{text}"
              </p>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${avatarColors[i]} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-xs font-bold text-white">{avatar}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{name}</p>
                  <p className="text-[11px] text-gray-400">{location}</p>
                </div>
                <div className="ml-auto">
                  <span className="text-[10px] font-semibold text-[#FF4913] bg-orange-50 px-2 py-0.5 rounded-full border border-[#FF4913]/20">
                    {product}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
