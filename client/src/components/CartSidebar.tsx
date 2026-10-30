import { useEffect, useRef, useState } from 'react';
import { useCartStore } from '../store/cartStore';
import api from '../api/axios';
import Receipt from './Receipt';

export default function CartSidebar() {
  const { items, isOpen, toggleCart, removeItem, updateQuantity, clearCart, total } = useCartStore();
  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [form, setForm] = useState({ name: '', phone: '', notes: '' });
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    closeButtonRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, step]);

  const handleCheckout = async () => {
    if (!form.name.trim() || !form.phone.trim()) {
      setError('Name and phone are required.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/orders', {
        customerName: form.name,
        customerPhone: form.phone,
        notes: form.notes,
        items: items.map((i) => ({
          menuItemId: i.menuItemId,
          name: i.name,
          size: i.size,
          price: i.price,
          quantity: i.quantity,
        })),
      });
      setOrder(data);
      setStep('success');
      clearCart();
    } catch {
      setError('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    toggleCart();
    setTimeout(() => {
      setStep('cart');
      setForm({ name: '', phone: '', notes: '' });
      setOrder(null);
    }, 300);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={handleClose}
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-brand-dark/40 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      {/* Sidebar */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={step === 'cart' ? 'Your order' : step === 'checkout' ? 'Checkout' : 'Order placed'}
        aria-hidden={!isOpen}
        className={`fixed top-0 right-0 h-full w-full max-w-md z-50 flex flex-col transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          background: 'rgba(250,249,247,0.92)',
          borderLeft: '1px solid rgba(224,219,213,0.8)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-brand-border">
          <h2 className="font-display text-xl font-bold">
            {step === 'cart' ? 'Your Order' : step === 'checkout' ? 'Checkout' : 'Order Placed!'}
          </h2>
          <button ref={closeButtonRef} aria-label="Close cart" onClick={handleClose} className="rounded p-2 text-brand-muted hover:bg-black/5 hover:text-brand-dark text-2xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-accent">
            ×
          </button>
        </div>

        {/* CART STEP */}
        {step === 'cart' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-3">
              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center py-16">
                  <span className="text-5xl mb-4">☕</span>
                  <p className="font-display text-lg font-bold text-brand-dark">Your cart is empty</p>
                  <p className="text-sm text-brand-muted mt-1">Add something from the menu</p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={`${item.menuItemId}-${item.size}`}
                    className="flex items-center gap-3 bg-white/60 border border-brand-border p-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm text-brand-dark truncate">{item.name}</p>
                      <p className="text-xs text-brand-muted capitalize">{item.size} · Rs {item.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity - 1)}
                        className="w-6 h-6 border border-brand-border flex items-center justify-center text-sm hover:bg-brand-border transition-colors"
                      >
                        −
                      </button>
                      <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.menuItemId, item.size, item.quantity + 1)}
                        className="w-6 h-6 border border-brand-border flex items-center justify-center text-sm hover:bg-brand-border transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.menuItemId, item.size)}
                      className="text-brand-muted hover:text-red-500 text-lg ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="px-6 py-5 border-t border-brand-border">
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-brand-muted uppercase tracking-wide">Total</span>
                  <span className="font-display text-xl font-bold">Rs {total()}</span>
                </div>
                <button
                  onClick={() => setStep('checkout')}
                  className="w-full bg-brand-dark text-brand-cream py-3 text-sm font-medium uppercase tracking-widest hover:opacity-80 transition-opacity"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </>
        )}

        {/* CHECKOUT STEP */}
        {step === 'checkout' && (
          <>
            <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-4">
              <p className="text-sm text-brand-muted">Total: <span className="font-bold text-brand-dark">Rs {total()}</span> · {items.reduce((s,i)=>s+i.quantity,0)} items</p>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs uppercase tracking-widest text-brand-muted mb-1 block">Your Name *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-brand-border bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
                    placeholder="Enter your name"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-brand-muted mb-1 block">Phone Number *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-brand-border bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent"
                    placeholder="03xx-xxxxxxx"
                  />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-widest text-brand-muted mb-1 block">Special Notes</label>
                  <textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full border border-brand-border bg-white/70 px-3 py-2.5 text-sm focus:outline-none focus:border-brand-accent resize-none"
                    rows={3}
                    placeholder="Any special requests..."
                  />
                </div>
              </div>

              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>

            <div className="px-6 py-5 border-t border-brand-border flex gap-3">
              <button
                onClick={() => setStep('cart')}
                className="flex-1 border border-brand-border py-3 text-sm font-medium uppercase tracking-widest hover:bg-brand-border transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="flex-1 bg-brand-dark text-brand-cream py-3 text-sm font-medium uppercase tracking-widest hover:opacity-80 transition-opacity disabled:opacity-50"
              >
                {loading ? 'Placing...' : 'Place Order'}
              </button>
            </div>
          </>
        )}

        {/* SUCCESS STEP */}
        {step === 'success' && order && (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center gap-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-3xl">
              ✓
            </div>
            <div>
              <p className="font-display text-2xl font-bold text-brand-dark">Order Placed!</p>
              <p className="text-brand-muted text-sm mt-1">Your order ID is</p>
              <p className="font-display text-3xl font-bold text-brand-accent mt-2 tracking-wider">
                {order.orderId}
              </p>
              <p className="text-xs text-brand-muted mt-2">Save this ID to track your order</p>
            </div>

            {/* Hidden receipt for download */}
            <Receipt order={order} />

            <div className="flex flex-col gap-3 w-full mt-2">
              <a
                href={`/track?id=${order.orderId}`}
                className="w-full border border-brand-dark py-3 text-sm font-medium uppercase tracking-widest hover:bg-brand-dark hover:text-brand-cream transition-colors text-center"
              >
                Track My Order
              </a>
              <button
                onClick={handleClose}
                className="w-full bg-brand-dark text-brand-cream py-3 text-sm font-medium uppercase tracking-widest hover:opacity-80 transition-opacity"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
