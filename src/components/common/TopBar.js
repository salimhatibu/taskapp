import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const TopBar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="topbar" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: 'var(--color-card)', padding: '1rem 2rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <NavLink to="/" style={({ isActive }) => ({ fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-accent)', textDecoration: isActive ? 'underline' : 'none' })}>Bookstore</NavLink>
        <NavLink to="/books" className={({ isActive }) => isActive ? 'active' : ''}>Books</NavLink>
        {isAuthenticated && !isAdmin && <NavLink to="/cart" className={({ isActive }) => isActive ? 'active' : ''}>Cart</NavLink>}
        {isAuthenticated && !isAdmin && <NavLink to="/orders" className={({ isActive }) => isActive ? 'active' : ''}>Orders</NavLink>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated && !isAdmin && <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>{user?.name || 'Profile'}</NavLink>}
        {isAuthenticated && isAdmin && <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>Admin</NavLink>}
        {isAuthenticated ? (
          <button className="btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Login</NavLink>
            <NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>Register</NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopBar; 