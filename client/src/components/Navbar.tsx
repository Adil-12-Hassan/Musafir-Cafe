import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();
  const location = useLocation();
  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const isAdmin = location.pathname.startsWith('/admin');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  if (isAdmin) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-brand-cream/80 border-b border-brand-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
        {/* Brand */}
        <Link to="/" className="font-display text-xl font-bold text-brand-dark tracking-tight">
          Musafir
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {[['/', 'Home'], ['/menu', 'Menu'], ['/track', 'Track Order'], ['/about', 'About']].map(
            ([path, label]) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
                    location.pathname === path
                      ? 'text-brand-dark'
                      : 'text-brand-muted hover:text-brand-dark'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ),
          )}
        </ul>

        {/* Cart button */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleCart}
            className="relative flex items-center gap-2 bg-brand-dark text-brand-cream px-4 py-2 text-xs font-medium uppercase tracking-widest hover:opacity-80 transition-opacity"
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span className="bg-amber-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="public-mobile-navigation"
            className="md:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`block w-5 h-0.5 bg-brand-dark transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brand-dark transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brand-dark transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="public-mobile-navigation"
        className={`md:hidden overflow-hidden transition-all duration-300 backdrop-blur-md bg-brand-cream/95 border-b border-brand-border ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <ul className="px-6 pb-4 flex flex-col gap-4 pt-2">
          {[['/', 'Home'], ['/menu', 'Menu'], ['/track', 'Track Order'], ['/about', 'About']].map(
            ([path, label]) => (
              <li key={path}>
                <Link
                  to={path}
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-brand-muted hover:text-brand-dark transition-colors"
                >
                  {label}
                </Link>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
}
