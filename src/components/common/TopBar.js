import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
        <Link to="/" style={{ fontWeight: 700, fontSize: '1.3rem', color: 'var(--color-accent)' }}>Bookstore</Link>
        <Link to="/books">Books</Link>
        {isAuthenticated && !isAdmin && <Link to="/cart">Cart</Link>}
        {isAuthenticated && !isAdmin && <Link to="/orders">Orders</Link>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {isAuthenticated && !isAdmin && <Link to="/profile">{user?.name || 'Profile'}</Link>}
        {isAuthenticated && isAdmin && <Link to="/admin/dashboard">Admin</Link>}
        {isAuthenticated ? (
          <button className="btn" onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopBar; 