import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import SiteFooter from '../components/SiteFooter';
import api from '../api/axios';
import { useCartStore } from '../store/cartStore';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  priceM: number;
  priceL: number;
  ingredients: string[];
}

export default function Home() {
  const [featured, setFeatured] = useState<MenuItem[]>([]);
  const { addItem } = useCartStore();

  useEffect(() => {
    api.get('/menu').then((r) => setFeatured(r.data.slice(0, 3))).catch(() => {});
    // Animate hero text on mount
    const els = document.querySelectorAll<HTMLElement>('.hero-anim');
    els.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 100 + i * 150);
    });
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <CartSidebar />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* background grain texture */}
        <div className="absolute inset-0 opacity-30"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #c9a97a22 0%, transparent 50%), radial-gradient(circle at 80% 20%, #3d2b1f11 0%, transparent 40%)' }} />

        <div className="max-w-6xl mx-auto px-6 w-full grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">
          {/* Left */}
          <div className="flex flex-col gap-6">
            <span className="hero-anim inline-block text-xs font-medium uppercase tracking-[0.2em] text-brand-muted border border-brand-border px-3 py-1 w-fit">
              Cart to Cafe · Faisalabad
            </span>
            <h1 className="hero-anim font-display text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] text-brand-dark">
              Every sip is<br />
              <span className="italic text-brand-accent">part of the</span><br />
              journey.
            </h1>
            <p className="hero-anim text-brand-muted text-base leading-relaxed max-w-md">
              Keep moving. Keep growing. Your journey is yours — and ours began with a single cart in Jinnah Colony.
            </p>
            <div className="hero-anim flex gap-3 flex-wrap">
              <Link
                to="/menu"
                className="bg-brand-dark text-brand-cream px-8 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                View Menu
              </Link>
              <Link
                to="/about"
                className="border border-brand-dark text-brand-dark px-8 py-3.5 text-xs font-medium uppercase tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-colors"
              >
                Our Story
              </Link>
            </div>
          </div>

          {/* Right — glass card */}
          <div className="hero-anim hidden md:flex items-center justify-center">
            <div
              className="relative w-72 h-72 flex flex-col items-center justify-center text-center p-8 rounded-2xl"
              style={{
                backdropFilter: 'blur(20px) saturate(200%)',
                background: 'rgba(61,43,31,0.88)',
                border: '1px solid rgba(201,169,122,0.25)',
                boxShadow: '0 32px 80px rgba(61,43,31,0.25)',
              }}
            >
              <span className="text-6xl mb-4">☕</span>
              <p className="font-display text-white italic text-base leading-relaxed">
                "Coffee isn't just a drink, it's a little pause in your journey."
              </p>
              <p className="text-xs text-white/50 mt-4 uppercase tracking-widest">Sip it. Feel it. Share it.</p>

              {/* floating coffee beans */}
              {['top-4 right-6', 'bottom-6 left-4', 'top-12 left-6'].map((pos, i) => (
                <span
                  key={i}
                  className={`absolute ${pos} text-lg opacity-30`}
                  style={{ animation: `float ${2 + i * 0.5}s ease-in-out infinite alternate` }}
                >
                  ✦
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="text-xs uppercase tracking-widest text-brand-muted">Scroll</span>
          <div className="w-px h-8 bg-brand-muted animate-pulse" />
        </div>
      </section>

      {/* ── FEATURED DRINKS ── */}
      <section className="py-24 bg-white/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-display text-3xl font-bold text-brand-dark">Featured Drinks</h2>
            <div className="flex-1 h-px bg-brand-border" />
            <Link to="/menu" className="text-xs uppercase tracking-widest text-brand-muted hover:text-brand-dark transition-colors">
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <div
                key={item.id}
                className="group bg-white border border-brand-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* color band */}
                <div className="h-2 bg-brand-accent" />
                <div className="p-6 flex flex-col gap-4">
                  <div>
                    <h3 className="font-display text-lg font-bold text-brand-dark">{item.name}</h3>
                    <p className="text-sm text-brand-muted mt-1 leading-relaxed">{item.description}</p>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {item.ingredients?.slice(0, 3).map((ing) => (
                      <span key={ing} className="text-[10px] uppercase tracking-wide px-2 py-0.5 bg-brand-cream border border-brand-border text-brand-muted">
                        {ing}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                    <div className="flex gap-4">
                      <div className="text-center">
                        <div className="text-[10px] uppercase tracking-widest text-brand-muted">Med</div>
                        <div className="font-semibold text-sm">Rs {item.priceM}</div>
                      </div>
                      <div className="w-px bg-brand-border" />
                      <div className="text-center">
                        <div className="text-[10px] uppercase tracking-widest text-brand-muted">Lrg</div>
                        <div className="font-semibold text-sm">Rs {item.priceL}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => addItem({ menuItemId: item.id, name: item.name, size: 'medium', price: item.priceM })}
                      className="bg-brand-dark text-brand-cream text-xs px-4 py-2 uppercase tracking-widest hover:opacity-80 transition-opacity"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STRIP ── */}
      <section className="bg-brand-accent text-brand-cream py-24">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] opacity-60 mb-4">Our Story</p>
            <h2 className="font-display text-4xl font-bold leading-tight mb-6">
              From a cart to a cafe — the Musafir journey.
            </h2>
            <p className="text-white/75 leading-relaxed mb-8">
              What started as a humble cart on the streets of Jinnah Colony grew into a place where people pause, connect, and carry on. Musafir means traveller — and every cup we serve is a small companion for yours.
            </p>
            <Link
              to="/about"
              className="inline-block border border-white/40 text-white text-xs px-6 py-3 uppercase tracking-widest hover:bg-white/10 transition-colors"
            >
              Read Our Story →
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {[
              { num: '6+', label: 'Signature Drinks' },
              { num: '1', label: 'Cart to Cafe' },
              { num: '∞', label: 'Journeys Shared' },
              { num: '100%', label: 'Made with Love' },
            ].map((s) => (
              <div key={s.label} className="border-t border-white/20 pt-4">
                <div className="font-display text-3xl font-bold text-white">{s.num}</div>
                <div className="text-xs text-white/60 mt-1 uppercase tracking-wide">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRACK ORDER STRIP ── */}
      <section className="py-16 border-t border-brand-border">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-brand-dark">Already ordered?</h3>
            <p className="text-brand-muted text-sm mt-1">Track your order with your Order ID (e.g. MSF-2047)</p>
          </div>
          <Link
            to="/track"
            className="bg-brand-dark text-brand-cream px-8 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Track My Order →
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <SiteFooter />

      <style>{`
        @keyframes float {
          from { transform: translateY(0px) rotate(0deg); }
          to   { transform: translateY(-8px) rotate(10deg); }
        }
      `}</style>
    </div>
  );
}
