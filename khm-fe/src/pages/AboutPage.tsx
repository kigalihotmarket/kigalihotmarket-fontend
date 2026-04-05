
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const AboutPage = () => {
  return (
    <div className="bg-white">
      {/* Hero section */}
      <div className="relative bg-gray-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="/images/brand/khm-billboard.jpeg"
            alt="Kigali Hot Market billboard"
            className="w-full h-full object-cover object-center opacity-40"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">About Kigali Hot Market</h1>
            <p className="mt-6 text-xl max-w-3xl mx-auto">
              We're on a mission to provide the best shopping experience with curated, premium products at fair prices.
            </p>
          </div>
        </div>
      </div>

      {/* Our story */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Kigali Hot Market Ltd is a multi-service company based at Yussa Centek City, Former Makuza Peace Plaza, 2nd Floor, KK42, Kigali – Nyarugenge. We offer a wide range of services designed to meet the needs of individuals and businesses across Rwanda and beyond.
              </p>
              <p>
                Our <strong>Online Shopping</strong> platform at kigalihotmarket.store gives you access to a wide catalog of products. We also offer <strong>Local Shopping</strong> at our physical store, and a full suite of <strong>Logistics</strong> services including sourcing of products, shipping by sea, air cargo, land transport (importing cars from Dar es Salaam to Kigali), and courier services.
              </p>
              <p>
                Through our <strong>Consultancy</strong> division we cover Financial Markets, Real Estate, and Web Design & Software Development. We also specialize in <strong>Car Sales & Rent</strong> — hybrid and full electric vehicles — including buying, selling, and spare parts.
              </p>
              <p>
                We are proud partners of leading banks and financial institutions including Bank of Kigali, BPR Bank, Ecobank, RDB, rura, Irembo, IM Bank, REG, Equity, WASAC, RRA, MTN, and Airtel — making payments and online services seamless for our customers.
              </p>
            </div>
            <Button className="mt-8" asChild>
              <Link to="/products">
                Browse Our Products
              </Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl w-full h-80 lg:h-[420px]">
            <img
              src="/images/brand/kmh-brand.jpeg"
              alt="Kigali Hot Market brand"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
      </div>

      {/* Values section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Core Values</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do, from product selection to customer service.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Quality First</h3>
              <p className="text-gray-600">
                We never compromise on product quality. Every item we sell meets our rigorous standards.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Transparency</h3>
              <p className="text-gray-600">
                We believe in honest pricing and clear communication about our products and policies.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Sustainability</h3>
              <p className="text-gray-600">
                We're committed to reducing our environmental impact through sustainable practices.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Customer Focus</h3>
              <p className="text-gray-600">
                Our customers are at the center of every decision we make. Your satisfaction is our priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Meet Our Leadership Team</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            The passionate people behind Kigali Hot Market who make it all happen.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
              <img
                src="/images/brand/olivie.jpeg"
                alt="Olivie Ndatimana portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">Olivie Ndatimana</h3>
            <p className="text-primary">CEO & Founder</p>
            <p className="mt-2 text-gray-600">
              With 15 years of retail experience, Olivie leads our company vision and strategy.
            </p>
          </div>

          <div className="text-center">
            <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden mb-4 max-w-[200px] mx-auto">
              <img
                src="/images/brand/kwizera-herve.png"
                alt="Kwizera Herve portrait"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-lg font-medium">Kwizera Herve</h3>
            <p className="text-primary">Fullstack Developer</p>
            <p className="mt-2 text-gray-600">
              Kwizera oversees our technology infrastructure and digital innovation initiatives.
            </p>
          </div>

        </div>
      </div>

      {/* CTA section */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="max-w-lg text-center md:text-left">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to start shopping?
              </h2>
              <p className="mt-3 text-lg text-blue-100">
                Join thousands of satisfied customers who trust Kigali Hot Market for premium products.
              </p>
            </div>
            <div className="mt-8 md:mt-0 flex flex-col sm:flex-row">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-blue-50"
                asChild
              >
                <Link to="/products">
                  Browse Products
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="mt-3 sm:mt-0 sm:ml-3 border-white text-white hover:bg-white/10"
                asChild
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
