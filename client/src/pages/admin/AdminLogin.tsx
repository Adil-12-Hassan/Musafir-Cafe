import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { useAuthStore } from '../../store/authStore';

export default function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setAccessToken } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      setAccessToken(data.accessToken);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid username or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-display text-3xl font-bold text-white mb-1">Musafir</div>
          <div className="text-xs uppercase tracking-[0.3em] text-white/40">Admin Panel</div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.08)',
            padding: '32px',
          }}
        >
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
              Username
            </label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              autoFocus
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 placeholder:text-white/20"
              placeholder="admin"
            />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full bg-white/5 border border-white/10 px-4 py-3 text-white text-sm focus:outline-none focus:border-white/30 placeholder:text-white/20"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-brand-dark py-3 text-xs font-bold uppercase tracking-widest hover:opacity-90 transition-opacity disabled:opacity-40 mt-2"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-white/20 mt-6 uppercase tracking-widest">
          Musafir Cafe Admin
        </p>
        <div className="mt-5 text-center">
          <span className="block text-[10px] uppercase tracking-[0.2em] text-white/30">Restricted Area</span>
          <Link
            to="/"
            className="mt-2 inline-flex items-center gap-2 text-sm text-amber-200/80 transition hover:text-amber-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-400"
          >
            ← Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}
