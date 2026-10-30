import { useEffect, useState } from 'react';
import api from '../../api/axios';

const STATUS_COLOR: Record<string, string> = {
  received:  'text-yellow-300',
  preparing: 'text-orange-400',
  ready:     'text-green-400',
  done:      'text-white/40',
};

export default function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<number | null>(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/orders').then(({ data }) => {
      setOrders(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-4 text-white sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-display text-2xl font-bold">Order History</h1>
          <p className="text-white/40 text-sm mt-1">{orders.length} total orders</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap mb-6">
        {['all', 'received', 'preparing', 'ready', 'done'].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-1.5 text-xs uppercase tracking-widest border transition-colors ${
              filter === s
                ? 'border-white/40 text-white bg-white/8'
                : 'border-white/8 text-white/30 hover:text-white/60 hover:border-white/20'
            }`}
          >
            {s === 'all' ? 'All' : s}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-white/30 text-sm text-center py-20">Loading...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/30 text-sm">No orders in this category</p>
        </div>
      ) : (
        <div className="border border-white/8 divide-y divide-white/5">
          {filtered.map((order) => (
            <div key={order.id}>
              {/* Row */}
              <button
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="flex w-full flex-col items-start justify-between gap-3 px-4 py-4 text-left transition-colors hover:bg-white/3 sm:flex-row sm:items-center sm:px-5"
              >
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 sm:gap-4">
                  <span className="font-mono text-sm font-bold text-white/80">{order.orderId}</span>
                  <span className="text-sm text-white/50">{order.customerName}</span>
                  <span className="text-xs text-white/25">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex w-full flex-wrap items-center justify-between gap-2 sm:w-auto sm:justify-end sm:gap-4">
                  <span className="text-sm text-white/60">Rs {order.total}</span>
                  <span className={`text-xs uppercase tracking-widest font-medium ${STATUS_COLOR[order.status] || 'text-white'}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-white/20">
                    {new Date(order.createdAt).toLocaleString('en-PK', {
                      day: 'numeric', month: 'short',
                      hour: '2-digit', minute: '2-digit',
                    })}
                  </span>
                  <span className={`text-white/20 transition-transform ${expanded === order.id ? 'rotate-180' : ''}`}>▾</span>
                </div>
              </button>

              {/* Expanded details */}
              {expanded === order.id && (
                <div className="px-5 pb-5 bg-white/2">
                  <div className="pt-3 border-t border-white/5 space-y-3">
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/40">
                      <span>📞 {order.customerPhone}</span>
                      {order.notes && <span>📝 {order.notes}</span>}
                    </div>
                    <div className="space-y-1.5">
                      {order.items?.map((item: any, i: number) => (
                        <div key={i} className="flex justify-between text-sm">
                          <span className="text-white/60">
                            {item.name}
                            <span className="text-white/30 ml-1 text-xs">({item.size}) ×{item.quantity}</span>
                          </span>
                          <span className="text-white/50">Rs {item.price * item.quantity}</span>
                        </div>
                      ))}
                      <div className="flex justify-between text-sm pt-2 border-t border-white/5">
                        <span className="font-medium text-white/70">Total</span>
                        <span className="font-bold text-white">Rs {order.total}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
