import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import SiteFooter from '../components/SiteFooter';
import api from '../api/axios';
import { useCartStore } from '../store/cartStore';

interface MenuItem {
  id: number;
  name: string;
  description: string;
  category: string;
  priceM: number;
  priceL: number;
  ingredients: string[];
  available: boolean;
}

const CATEGORIES = ['all', 'coffee', 'specialty', 'cold'];

export default function Menu() {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);
  const { addItem } = useCartStore();

  useEffect(() => {
    api.get('/menu').then((r) => {
      setItems(r.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? items : items.filter((i) => i.category === filter);

  const handleAdd = (item: MenuItem, size: 'medium' | 'large') => {
    const key = `${item.id}-${size}`;
    addItem({
      menuItemId: item.id,
      name: item.name,
      size,
      price: size === 'medium' ? item.priceM : item.priceL,
    });
    setAddedId(key);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <CartSidebar />

      {/* Page header */}
      <div className="pt-24 pb-10 border-b border-brand-border">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted mb-3">Musafir Cafe</p>
          <h1 className="font-display text-5xl font-bold text-brand-dark">Our Menu</h1>
          <p className="text-brand-muted mt-3 max-w-md">
            Crafted with care, each drink is a small journey. Find your companion for the road.
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Category filter */}
        <div className="flex gap-2 flex-wrap mb-10">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2 text-xs font-medium uppercase tracking-widest border transition-colors duration-200 ${
                filter === cat
                  ? 'bg-brand-dark text-brand-cream border-brand-dark'
                  : 'border-brand-border text-brand-muted hover:border-brand-dark hover:text-brand-dark'
              }`}
            >
              {cat === 'all' ? 'All Drinks' : cat}
            </button>
          ))}
        </div>

        {/* Loading skeleton */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white border border-brand-border animate-pulse">
                <div className="h-2 bg-brand-border" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-brand-border rounded w-2/3" />
                  <div className="h-3 bg-brand-border rounded w-full" />
                  <div className="h-3 bg-brand-border rounded w-4/5" />
                  <div className="flex gap-2 mt-4">
                    <div className="h-5 w-16 bg-brand-border rounded" />
                    <div className="h-5 w-16 bg-brand-border rounded" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Menu grid */}
        {!loading && (
          <>
            {filtered.length === 0 ? (
              <div className="text-center py-24">
                <span className="text-5xl block mb-4">☕</span>
                <p className="text-brand-muted">No drinks in this category yet.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((item) => (
                  <div
                    key={item.id}
                    className={`group flex flex-col bg-white border border-brand-border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      !item.available ? 'opacity-50' : ''
                    }`}
                  >
                    {/* Category accent bar */}
                    <div className={`h-1.5 ${
                      item.category === 'coffee' ? 'bg-brand-accent' :
                      item.category === 'specialty' ? 'bg-amber-400' : 'bg-sky-400'
                    }`} />

                    <div className="p-6 flex flex-col gap-4 flex-1">
                      {/* Name + badge */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-display text-xl font-bold text-brand-dark leading-tight">
                          {item.name}
                        </h3>
                        <span className={`shrink-0 text-[10px] uppercase tracking-widest px-2 py-0.5 border ${
                          item.category === 'coffee'
                            ? 'border-brand-accent text-brand-accent'
                            : item.category === 'specialty'
                            ? 'border-amber-500 text-amber-600'
                            : 'border-sky-400 text-sky-600'
                        }`}>
                          {item.category}
                        </span>
                      </div>

                      <p className="text-sm text-brand-muted leading-relaxed flex-1">{item.description}</p>

                      {/* Ingredients */}
                      {item.ingredients?.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {item.ingredients.map((ing) => (
                            <span
                              key={ing}
                              className="text-[10px] uppercase tracking-wide px-2 py-0.5 bg-brand-cream border border-brand-border text-brand-muted"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Price + Add buttons */}
                      {item.available ? (
                        <div className="pt-2 border-t border-brand-border">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => handleAdd(item, 'medium')}
                              className={`flex flex-col items-center py-2.5 border transition-all duration-200 ${
                                addedId === `${item.id}-medium`
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-brand-border hover:bg-brand-dark hover:border-brand-dark hover:text-brand-cream'
                              }`}
                            >
                              <span className="text-[10px] uppercase tracking-widest opacity-60">Medium</span>
                              <span className="font-semibold text-sm mt-0.5">
                                {addedId === `${item.id}-medium` ? '✓ Added' : `Rs ${item.priceM}`}
                              </span>
                            </button>
                            <button
                              onClick={() => handleAdd(item, 'large')}
                              className={`flex flex-col items-center py-2.5 border transition-all duration-200 ${
                                addedId === `${item.id}-large`
                                  ? 'bg-green-500 border-green-500 text-white'
                                  : 'border-brand-border hover:bg-brand-dark hover:border-brand-dark hover:text-brand-cream'
                              }`}
                            >
                              <span className="text-[10px] uppercase tracking-widest opacity-60">Large</span>
                              <span className="font-semibold text-sm mt-0.5">
                                {addedId === `${item.id}-large` ? '✓ Added' : `Rs ${item.priceL}`}
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-2 border-t border-brand-border text-center text-xs uppercase tracking-widest text-brand-muted py-3">
                          Currently Unavailable
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
