import { useEffect, useState } from 'react';
import { NavLink, useNavigate, Outlet, useLocation } from 'react-router-dom';
import api from '../api/axios';
import { useAuthStore } from '../store/authStore';

const NAV = [
  { to: '/admin/dashboard', icon: '◈', label: 'Dashboard' },
  { to: '/admin/orders', icon: '⚡', label: 'Live Orders' },
  { to: '/admin/menu', icon: '☕', label: 'Menu' },
  { to: '/admin/history', icon: '▤', label: 'History' },
];

export default function AdminLayout() {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const handleLogout = async () => {
    try { await api.post('/auth/logout'); } catch {}
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0f0e0d] text-white">
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/8 bg-[#111009]/95 px-4 backdrop-blur md:hidden">
        <div>
          <div className="font-display text-lg font-bold">Musafir</div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-white/35">Admin Panel</div>
        </div>
        <button
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="admin-navigation"
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 text-white transition hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
        >
          <span className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-5 bg-current transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-5 bg-current transition-transform ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)] md:min-h-screen">
        {menuOpen && (
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-30 bg-black/65 md:hidden"
          />
        )}

        <aside
          id="admin-navigation"
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-white/8 bg-[#111009] shadow-2xl transition-transform duration-300 md:sticky md:top-0 md:h-screen md:w-56 md:translate-x-0 md:shadow-none ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <div className="flex items-center justify-between border-b border-white/5 px-6 py-6">
            <div>
              <div className="font-display text-lg font-bold">Musafir</div>
              <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/30">Admin Panel</div>
            </div>
            <button type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} className="rounded p-2 text-xl text-white/45 hover:bg-white/5 hover:text-white md:hidden">×</button>
          </div>

          <nav className="flex-1 space-y-1 px-3 py-4">
            {NAV.map(({ to, icon, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-md px-3 py-3 text-sm transition-colors ${isActive ? 'bg-amber-400/10 text-amber-200 ring-1 ring-inset ring-amber-300/15' : 'text-white/45 hover:bg-white/5 hover:text-white/85'}`
                }
              >
                <span aria-hidden="true" className="w-5 text-center text-base">{icon}</span>
                <span className="tracking-wide">{label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-white/5 px-3 py-4">
            <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-md px-3 py-3 text-sm text-white/35 transition-colors hover:bg-red-400/5 hover:text-red-300">
              <span aria-hidden="true" className="w-5 text-center">↩</span><span>Logout</span>
            </button>
          </div>
        </aside>

        <main className="min-w-0 flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
