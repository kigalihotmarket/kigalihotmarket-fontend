import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, Phone, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect, useRef } from 'react';
import { assets } from '@/assets/Assets';

const categories = [
  { label: 'Mens Fashion', slug: 'MENS_FASHION' },
  { label: 'Sports & Equipment', slug: 'SPORTS_EQUIPMENT' },
  { label: 'Health & Beauty', slug: 'HEALTH_AND_BEAUTY' },
  { label: 'Electronics', slug: 'ELECTRONICS' },
  { label: 'Furniture', slug: 'FURNITURES' },
  { label: 'Computers & Gaming', slug: 'COMPUTERS_AND_GAMING' },
  { label: 'Home & Living', slug: 'HOME_AND_LIVING' },
  { label: 'Supermarket', slug: 'SUPERMARKETING' },
  { label: 'Made in Rwanda', slug: 'MADE_IN_RWANDA' },
  { label: 'Kids & Babies', slug: 'KIDS_AND_BABIES' },
];

const Navbar = () => {
  const { cartItemCount } = useCart();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleAccountRedirect = () => {
    const userData = localStorage.getItem('userData');
    window.location.href = userData ? '/dashboard' : '/auth/login';
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="bg-[#583730] text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span className="font-medium">
            Win: Free Local Delivery On Orders Above 50K RWF!
          </span>
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+250788547719" className="flex items-center gap-1 hover:text-orange-300 transition-colors">
              <Phone className="h-3.5 w-3.5" />
              +250 788 547 719
            </a>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <img
                src={assets.images.logo}
                alt="Kigali Hot Market Logo"
                className="h-9 w-auto"
              />
              <span className="text-xl font-bold text-[#FF4913] hidden lg:block leading-tight">
                KIGALI<br />
                <span className="text-gray-800 text-sm font-semibold">HOT MARKET</span>
              </span>
            </Link>

            {/* Search bar (desktop) */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 mx-4">
              <div className="relative w-full">
                <Input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products, brands, categories..."
                  className="w-full pl-4 pr-12 py-2.5 rounded-full border-2 border-[#FF4913] focus-visible:ring-0 focus-visible:border-[#FF4913] bg-gray-50 text-sm"
                />
                <button type="submit" className="absolute right-0 top-0 bottom-0 bg-[#FF4913] text-white px-4 rounded-r-full hover:bg-orange-600 transition-colors flex items-center">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </form>

            {/* Right actions */}
            <div className="flex items-center gap-2 ml-auto md:ml-0">
              <button
                onClick={handleAccountRedirect}
                className="hidden md:flex items-center gap-1.5 text-gray-700 hover:text-[#FF4913] transition-colors text-sm font-medium"
              >
                <User className="h-5 w-5" />
                <span>Account</span>
              </button>

              <Link to="/cart" className="relative flex items-center gap-1.5 text-gray-700 hover:text-[#FF4913] transition-colors">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-[#FF4913] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                      {cartItemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile: account icon */}
              <button
                onClick={handleAccountRedirect}
                className="md:hidden"
              >
                <User className="h-5 w-5 text-gray-700" />
              </button>

              {/* Mobile menu toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Category mega-menu bar (desktop) */}
      <nav className="hidden md:block bg-[#016e52] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1">
            <div className="relative group">
              <button className="flex items-center gap-1.5 px-4 py-3 font-semibold bg-[#FF4913] hover:bg-orange-600 transition-colors text-sm">
                <Menu className="h-4 w-4" />
                All Categories
                <ChevronDown className="h-3.5 w-3.5 ml-1" />
              </button>
              <div className="absolute z-20 left-0 top-full w-56 bg-white text-gray-800 shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {categories.map((cat) => (
                  <Link
                    key={cat.slug}
                    to={`/products?category=${cat.slug}`}
                    className="flex items-center px-4 py-2.5 text-sm hover:bg-orange-50 hover:text-[#FF4913] border-b border-gray-50 transition-colors"
                  >
                    {cat.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link to="/" className="px-4 py-3 text-sm font-medium hover:bg-[#108474] transition-colors">
              Home
            </Link>
            <Link to="/products" className="px-4 py-3 text-sm font-medium hover:bg-[#108474] transition-colors">
              All Products
            </Link>
            {categories.slice(0, 3).map((cat) => (
              <Link
                key={cat.slug}
                to={`/products?category=${cat.slug}`}
                className="px-4 py-3 text-sm font-medium hover:bg-[#108474] transition-colors"
              >
                {cat.label}
              </Link>
            ))}
            <Link to="/about" className="px-4 py-3 text-sm font-medium hover:bg-[#108474] transition-colors ml-auto">
              About Us
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-2xl fixed inset-y-0 right-0 w-72 z-50 overflow-y-auto"
        >
          <div className="flex items-center justify-between px-4 py-4 bg-[#FF4913] text-white">
            <span className="font-bold text-lg">Menu</span>
            <button onClick={() => setIsMenuOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile search */}
          <form onSubmit={handleSearch} className="p-4 border-b border-gray-100">
            <div className="relative">
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pr-10 border-2 border-gray-200"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                <Search className="h-4 w-4 text-[#FF4913]" />
              </button>
            </div>
          </form>

          <nav className="py-2">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF4913] font-medium border-b border-gray-50">
              Home
            </Link>
            <Link to="/products" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF4913] font-medium border-b border-gray-50">
              All Products
            </Link>

            <div>
              <button
                className="flex items-center justify-between px-4 py-3 text-gray-700 font-medium w-full border-b border-gray-50 hover:bg-orange-50 hover:text-[#FF4913]"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>Categories</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryOpen && (
                <div className="bg-gray-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      to={`/products?category=${cat.slug}`}
                      onClick={() => setIsMenuOpen(false)}
                      className="block pl-8 pr-4 py-2.5 text-sm text-gray-600 hover:text-[#FF4913] border-b border-gray-100"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link to="/about" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF4913] font-medium border-b border-gray-50">
              About Us
            </Link>
            <button
              onClick={() => { setIsMenuOpen(false); handleAccountRedirect(); }}
              className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 hover:text-[#FF4913] font-medium w-full text-left border-b border-gray-50"
            >
              My Account
            </button>
          </nav>

          <div className="p-4 bg-[#583730] text-white text-sm mt-4">
            <p className="font-semibold">Free Delivery Above 50K RWF</p>
            <p className="text-white/70 text-xs mt-1">Shop more, save more!</p>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
