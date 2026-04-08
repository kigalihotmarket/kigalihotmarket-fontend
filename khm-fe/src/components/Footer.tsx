import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter bar */}
      <div className="bg-[#FF4913]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white text-xl font-bold">Stay in the loop</h3>
              <p className="text-white/80 text-sm mt-1">Get exclusive deals and new arrivals straight to your inbox.</p>
            </div>
            <div className="flex w-full md:w-auto gap-0 max-w-md">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-grow py-3 px-4 text-sm text-gray-900 bg-white rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button className="bg-[#583730] hover:bg-[#6e4740] text-white font-bold py-3 px-6 rounded-r-full text-sm transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-white text-lg font-extrabold mb-1">
              <span className="text-[#FF4913]">KIGALI</span> HOT MARKET
            </h3>
            <p className="text-xs text-[#016e52] font-semibold mb-3">Kigali's best online market</p>
            <p className="text-sm text-gray-400 leading-relaxed">
              Your one-stop destination for premium products. We connect local vendors with shoppers across Rwanda.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {/* Facebook */}
              <a href="#" className="text-gray-400 hover:text-[#FF4913] transition-colors" aria-label="Facebook">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="text-gray-400 hover:text-[#FF4913] transition-colors" aria-label="X">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              {/* Instagram */}
              <a href="#" className="text-gray-400 hover:text-[#FF4913] transition-colors" aria-label="Instagram">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF4913] transition-colors" aria-label="YouTube">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.1.7 11.3v2c0 2.1.3 4.3.3 4.3s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 21.8 12 21.8 12 21.8s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.1.3-4.3v-2C23.3 9.1 23 7 23 7zM9.7 15.5V8.3l8.1 3.6-8.1 3.6z"/></svg>
              </a>
              <a href={`https://wa.me/250788547719`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF4913] transition-colors" aria-label="WhatsApp">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', to: '/' },
                { label: 'All Products', to: '/products' },
                { label: 'About Us', to: '/about' },
                { label: 'My Account', to: '/dashboard' },
                { label: 'Shopping Cart', to: '/cart' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2.5">
              {[
                { label: 'FAQ', to: '/faq' },
                { label: 'Shipping Policy', to: '/shipping' },
                { label: 'Returns & Exchanges', to: '/returns' },
                { label: 'Terms & Conditions', to: '/terms' },
                { label: 'Privacy Policy', to: '/privacy' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-sm text-gray-400 hover:text-white hover:pl-1 transition-all duration-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white text-sm font-bold mb-4 uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-[#FF4913] flex-shrink-0" />
                <span className="text-sm text-gray-400">Kigali, Rwanda</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 mt-0.5 text-[#FF4913] flex-shrink-0" />
                <a href="mailto:kigalihotmarket250ltd@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  kigalihotmarket250ltd@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 mt-0.5 text-[#FF4913] flex-shrink-0" />
                <a href="tel:+250788547719" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +250 788 547 719
                </a>
              </li>
            </ul>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap gap-2">
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 text-center">
                <div className="text-[#016e52] font-bold text-sm">100%</div>
                Secure
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 text-center">
                <div className="text-[#FF4913] font-bold text-sm">Fast</div>
                Delivery
              </div>
              <div className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-400 text-center">
                <div className="text-yellow-400 font-bold text-sm">Easy</div>
                Returns
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Kigali Hot Market. All rights reserved.
          </p>
          <p className="text-xs text-gray-600">
            Made with love in Rwanda
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
