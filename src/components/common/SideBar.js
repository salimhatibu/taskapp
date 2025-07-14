import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
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
      <NavLink to="/admin/dashboard" style={({ isActive }) => ({ fontWeight: 700, fontSize: '1.2rem', color: 'var(--color-accent)', textDecoration: isActive ? 'underline' : 'none' })}>Admin Panel</NavLink>
      <NavLink to="/admin/users" className={({ isActive }) => isActive ? 'active' : ''}>Users</NavLink>
      <NavLink to="/admin/books" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
      <NavLink to="/admin/orders" className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>
      <NavLink to="/admin/categories" className={({ isActive }) => isActive ? 'active' : ''}>Categories</NavLink>
      <NavLink to="/admin/reports" className={({ isActive }) => isActive ? 'active' : ''}>Reports</NavLink>
      <button className="btn" onClick={handleLogout} style={{ marginTop: '2rem' }}>Logout</button>
    </aside>
  );
};

export default SideBar; 