import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Public pages
import Home from './pages/Home';
import Menu from './pages/Menu';
import Track from './pages/Track';
import About from './pages/About';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/Dashboard';
import LiveOrders from './pages/admin/LiveOrders';
import MenuManager from './pages/admin/MenuManager';
import OrderHistory from './pages/admin/OrderHistory';
import AdminLayout from './components/AdminLayout';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/track" element={<Track />} />
        <Route path="/about" element={<About />} />

        {/* Admin login (public) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin — protected + layout */}
        <Route path="/admin" element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="orders" element={<LiveOrders />} />
            <Route path="menu" element={<MenuManager />} />
            <Route path="history" element={<OrderHistory />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
