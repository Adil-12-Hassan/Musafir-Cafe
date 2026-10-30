import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

const STATUSES = ['received', 'preparing', 'ready', 'done'];

const STATUS_COLOR: Record<string, string> = {
  received:  'text-yellow-300 border-yellow-300/30 bg-yellow-300/5',
  preparing: 'text-orange-400 border-orange-400/30 bg-orange-400/5',
  ready:     'text-green-400 border-green-400/30 bg-green-400/5',
  done:      'text-white/30 border-white/10 bg-white/3',
};

export default function LiveOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState<number | null>(null);
  const [newIds, setNewIds] = useState<Set<string>>(new Set());
  const [error, setError] = useState('');
  const { accessToken } = useAuthStore();

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data);
      setError('');
    } catch {
      setError('Could not load orders. Please sign in again and retry.');
    }
    setLoading(false);
  };

  useEffect(() => {
    void fetchOrders();

    // Connect WebSocket
    const socket = io('http://localhost:3001/orders', {
      transports: ['websocket'],
      auth: { token: accessToken },
    });
    socket.on('connect', () => socket.emit('admin_join'));
    socket.on('connect_error', () => setError('Live connection failed. Orders will still load when refreshed.'));
    socket.on('joined', () => setError(''));
    socket.on('new_order', (order: any) => {
      setOrders((prev) => [order, ...prev.filter((existing) => existing.id !== order.id)]);
      setNewIds((prev) => new Set([...prev, order.orderId]));
      setTimeout(() => {
        setNewIds((prev) => {
          const next = new Set(prev);
          next.delete(order.orderId);
          return next;
        });
      }, 4000);
    });

    socket.on('order_status_update', ({ orderId, status }: { orderId: string; status: string }) => {
      setOrders((prev) =>
        prev.map((o) => (o.orderId === orderId ? { ...o, status } : o))
      );
    });

    return () => { socket.disconnect(); };
  }, [accessToken]);

  const updateStatus = async (id: number, status: string) => {
    setUpdatingId(id);
    setError('');
    try {
      const { data } = await api.patch(`/orders/${id}/status`, { status });
      setOrders((prev) => prev.map((o) => (o.id === id ? data : o)));
    } catch {
      setError('Could not update order status. Check your admin session and try again.');
    } finally {
      setUpdatingId(null);
    }
  };

  const active = orders.filter((o) => o.status !== 'done');

  return (
    <div className="p-4 text-white sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold text-white">Live Orders</h1>
          <p className="text-white/40 text-sm mt-1">Real-time order management</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-white/40 uppercase tracking-widest">Live</span>
          <span className="ml-3 text-sm text-white/60 font-medium">{active.length} active</span>
        </div>
      </div>

      {error && <div role="alert" className="mb-5 border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-200">{error}</div>}

      {loading ? (
        <div className="text-white/30 text-sm text-center py-20">Connecting...</div>
      ) : active.length === 0 ? (
        <div className="text-center py-24">
          <span className="text-5xl block mb-4">☕</span>
          <p className="text-white/30 text-sm">No active orders right now</p>
        </div>
      ) : (
        <div className="space-y-4">
          {active.map((order) => (
            <div
              key={order.id}
              className={`border transition-all duration-500 ${
                newIds.has(order.orderId)
                  ? 'border-green-400/50 bg-green-400/5'
                  : 'border-white/8 bg-white/3'
              }`}
            >
              {/* Order header */}
              <div className="flex flex-col gap-3 border-b border-white/5 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-2">
                  {newIds.has(order.orderId) && (
                    <span className="text-[10px] bg-green-400 text-black px-2 py-0.5 uppercase font-bold tracking-widest">
                      NEW
                    </span>
                  )}
                  <span className="font-mono text-base font-bold text-white">{order.orderId}</span>
                  <span className="text-sm text-white/50">{order.customerName}</span>
                  <span className="text-xs text-white/30">{order.customerPhone}</span>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-auto">
                  <span className="font-bold text-white">Rs {order.total}</span>
                  <span className="text-xs text-white/30">
                    {new Date(order.createdAt).toLocaleTimeString('en-PK', {
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="px-5 py-3 border-b border-white/5 flex flex-wrap gap-2">
                {order.items?.map((item: any, i: number) => (
                  <span
                    key={i}
                    className="text-xs bg-white/6 border border-white/8 px-3 py-1 text-white/60"
                  >
                    {item.name} <span className="text-white/30">({item.size}) ×{item.quantity}</span>
                  </span>
                ))}
                {order.notes && (
                  <span className="text-xs italic text-white/30 ml-2">
                    "{order.notes}"
                  </span>
                )}
              </div>

              {/* Status controls */}
              <div className="px-5 py-4 flex items-center gap-2 flex-wrap">
                <span className="text-xs text-white/30 uppercase tracking-widest mr-1">Status:</span>
                {STATUSES.map((s) => (
                  <button
                    key={s}
                    disabled={updatingId === order.id || order.status === s}
                    onClick={() => updateStatus(order.id, s)}
                    className={`px-3 py-1.5 text-xs uppercase tracking-widest border font-medium transition-all ${
                      order.status === s
                        ? STATUS_COLOR[s]
                        : 'text-white/25 border-white/8 hover:text-white/60 hover:border-white/20'
                    } ${updatingId === order.id ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
