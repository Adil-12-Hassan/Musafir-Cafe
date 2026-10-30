import { useEffect, useState } from 'react';
import api from '../../api/axios';

interface Stats {
  total: number;
  revenue: number;
  byStatus: Record<string, number>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const [s, o] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/orders'),
        ]);
        setStats(s.data);
        setRecent(o.data.slice(0, 5));
      } catch {}
      setLoading(false);
    };
    load();
  }, []);

  const STATUS_COLOR: Record<string, string> = {
    received:  'text-yellow-300',
    preparing: 'text-orange-400',
    ready:     'text-green-400',
    done:      'text-white/40',
  };

  if (loading) return (
    <div className="flex items-center justify-center h-screen text-white/30 text-sm">Loading…</div>
  );

  return (
    <div className="p-4 text-white sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Today's overview</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Today's Orders", value: stats?.total ?? 0, icon: '⚡' },
          { label: 'Revenue', value: `Rs ${stats?.revenue ?? 0}`, icon: '💰' },
          { label: 'Received', value: stats?.byStatus?.received ?? 0, icon: '📋' },
          { label: 'Ready', value: stats?.byStatus?.ready ?? 0, icon: '🛎️' },
        ].map((s) => (
          <div
            key={s.label}
            className="p-5 border border-white/8 bg-white/4 flex flex-col gap-3"
          >
            <span className="text-xl">{s.icon}</span>
            <div>
              <div className="font-display text-2xl font-bold text-white">{s.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest mt-0.5">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Status breakdown */}
      {stats?.byStatus && (
        <div className="mb-10">
          <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Order Status Breakdown</h2>
          <div className="flex gap-3 flex-wrap">
            {Object.entries(stats.byStatus).map(([status, count]) => (
              <div key={status} className="flex items-center gap-2 bg-white/4 border border-white/8 px-4 py-2">
                <span className={`text-xs font-medium uppercase tracking-widest ${STATUS_COLOR[status] || 'text-white'}`}>
                  {status}
                </span>
                <span className="text-white font-bold text-sm">{count as number}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent orders */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-white/40 mb-4">Recent Orders</h2>
        <div className="border border-white/8 divide-y divide-white/5">
          {recent.length === 0 ? (
            <div className="p-6 text-center text-white/30 text-sm">No orders today yet</div>
          ) : (
            recent.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3.5 hover:bg-white/3 transition-colors">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-bold text-white/80">{order.orderId}</span>
                  <span className="text-sm text-white/50">{order.customerName}</span>
                  <span className="text-xs text-white/30">{order.items?.length} item{order.items?.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-white/60">Rs {order.total}</span>
                  <span className={`text-xs uppercase tracking-widest font-medium ${STATUS_COLOR[order.status] || 'text-white'}`}>
                    {order.status}
                  </span>
                  <span className="text-xs text-white/20">
                    {new Date(order.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
