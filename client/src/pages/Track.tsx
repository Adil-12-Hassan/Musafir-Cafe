import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartSidebar from '../components/CartSidebar';
import SiteFooter from '../components/SiteFooter';
import api from '../api/axios';

const STATUS_STEPS = ['received', 'preparing', 'ready', 'done'];

const STATUS_LABELS: Record<string, string> = {
  received:  'Order Received',
  preparing: 'Being Prepared',
  ready:     'Ready for Pickup',
  done:      'Completed',
};

const STATUS_ICONS: Record<string, string> = {
  received: '1',
  preparing: '2',
  ready: '3',
  done: '4',
};

interface Order {
  id: number;
  orderId: string;
  customerName: string;
  customerPhone: string;
  items: { name: string; size: string; price: number; quantity: number }[];
  total: number;
  status: string;
  notes?: string;
  createdAt: string;
}

export default function Track() {
  const [searchParams] = useSearchParams();
  const [inputId, setInputId] = useState(searchParams.get('id') || '');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const search = async (id: string) => {
    if (!id.trim()) return;
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const { data } = await api.get(`/orders/track/${id.trim().toUpperCase()}`);
      setOrder(data);
    } catch {
      setError('No order found with that ID. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const id = searchParams.get('id');
    if (id) search(id);
  }, []);

  const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1;

  return (
    <div className="min-h-screen bg-brand-cream">
      <Navbar />
      <CartSidebar />

      {/* Header */}
      <div className="pt-24 pb-10 border-b border-brand-border">
        <div className="max-w-2xl mx-auto px-6">
          <p className="text-xs uppercase tracking-[0.2em] text-brand-muted mb-3">Track Order</p>
          <h1 className="font-display text-5xl font-bold text-brand-dark">Where's my order?</h1>
          <p className="text-brand-muted mt-3">
            Enter the Order ID from your receipt (e.g. MSF-2047) to see your order status.
          </p>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Search bar */}
        <div className="flex gap-2 mb-12">
          <input
            type="text"
            value={inputId}
            onChange={(e) => setInputId(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && search(inputId)}
            placeholder="MSF-XXXX"
            className="flex-1 border border-brand-border bg-white px-4 py-3.5 text-sm font-mono tracking-wider focus:outline-none focus:border-brand-accent placeholder:text-brand-muted/40"
          />
          <button
            onClick={() => search(inputId)}
            disabled={loading || !inputId.trim()}
            className="bg-brand-dark text-brand-cream px-8 py-3.5 text-xs font-medium uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-40"
          >
            {loading ? '...' : 'Track'}
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600 mb-8">
            {error}
          </div>
        )}

        {/* Order result */}
        {order && (
          <div className="space-y-8">
            {/* Order header */}
            <div className="flex items-start justify-between border-b border-brand-border pb-6">
              <div>
                <div className="font-display text-3xl font-bold text-brand-dark tracking-wider">
                  {order.orderId}
                </div>
                <div className="text-sm text-brand-muted mt-1">
                  Placed by {order.customerName} · {new Date(order.createdAt).toLocaleString('en-PK', {
                    day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                  })}
                </div>
              </div>
              <div className={`px-4 py-1.5 text-xs font-medium uppercase tracking-widest border ${
                order.status === 'done'
                  ? 'bg-green-50 border-green-200 text-green-700'
                  : order.status === 'ready'
                  ? 'bg-amber-50 border-amber-200 text-amber-700'
                  : 'bg-blue-50 border-blue-200 text-blue-700'
              }`}>
                {STATUS_LABELS[order.status] || order.status}
              </div>
            </div>

            {/* Progress tracker */}
            <div>
              <div className="flex items-start justify-between relative">
                {/* connector line */}
                <div className="absolute top-4 left-0 right-0 h-px bg-brand-border z-0" />
                <div
                  className="absolute top-4 left-0 h-px bg-brand-accent z-0 transition-all duration-700"
                  style={{ width: `${Math.max(0, (currentStep / (STATUS_STEPS.length - 1)) * 100)}%` }}
                />

                {STATUS_STEPS.map((step, i) => {
                  const done = i <= currentStep;
                  const active = i === currentStep;
                  return (
                    <div key={step} className="flex flex-col items-center gap-2 z-10 flex-1">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm transition-all duration-300 ${
                        done
                          ? 'bg-brand-accent border-brand-accent text-white'
                          : 'bg-brand-cream border-brand-border text-brand-muted'
                      } ${active ? 'scale-110 shadow-md' : ''}`}>
                        {done ? (active ? STATUS_ICONS[step] : '✓') : '·'}
                      </div>
                      <div className={`text-[10px] text-center leading-tight uppercase tracking-wide max-w-[64px] ${
                        done ? 'text-brand-dark font-medium' : 'text-brand-muted'
                      }`}>
                        {STATUS_LABELS[step]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Items */}
            <div className="bg-white border border-brand-border">
              <div className="px-5 py-3 border-b border-brand-border">
                <span className="text-xs uppercase tracking-widest text-brand-muted font-medium">
                  Order Items
                </span>
              </div>
              <div className="px-5 divide-y divide-brand-border">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-3">
                    <div>
                      <p className="text-sm font-medium text-brand-dark">{item.name}</p>
                      <p className="text-xs text-brand-muted capitalize">{item.size} × {item.quantity}</p>
                    </div>
                    <span className="text-sm font-semibold">Rs {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 border-t border-brand-border flex justify-between">
                <span className="text-sm font-medium uppercase tracking-wide">Total</span>
                <span className="font-display text-lg font-bold">Rs {order.total}</span>
              </div>
            </div>

            {order.notes && (
              <div className="text-sm text-brand-muted border-l-2 border-brand-accent pl-4 italic">
                Note: {order.notes}
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!order && !loading && !error && (
          <div className="text-center py-16">
            <span className="text-6xl block mb-4">🛵</span>
            <p className="font-display text-xl font-bold text-brand-dark">Enter your Order ID above</p>
            <p className="text-brand-muted text-sm mt-2">It looks like MSF-2047 — check your receipt</p>
          </div>
        )}
      </div>
      <SiteFooter />
    </div>
  );
}
