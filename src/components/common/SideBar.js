import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SideBar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <aside className="sidebar" style={{
      width: 220, background: 'var(--color-card)', minHeight: '100vh',
      padding: '2rem 1rem', boxShadow: '2px 0 8px rgba(0,0,0,0.08)',
      display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'fixed', left: 0, top: 0, zIndex: 100
    }}>
      <Link to="/admin/dashboard" style={{ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-accent)' }}>Admin Panel</Link>
      <Link to="/admin/users">Users</Link>
      <Link to="/admin/books">Books</Link>
      <Link to="/admin/orders">Orders</Link>
      <Link to="/admin/categories">Categories</Link>
      <Link to="/admin/reports">Reports</Link>
      <button className="btn" onClick={handleLogout} style={{ marginTop: '2rem' }}>Logout</button>
    </aside>
  );
};

export default SideBar; 