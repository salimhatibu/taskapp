import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div className="home-page" style={{
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #232526 0%, #414345 100%)',
    color: 'var(--color-text)',
    padding: '3rem 1rem'
  }}>
    <h1 style={{ fontSize: '2.8rem', marginBottom: 16, color: 'var(--color-accent)' }}>Welcome to Magenta Bookstore</h1>
    <p style={{ fontSize: '1.3rem', maxWidth: 600, textAlign: 'center', marginBottom: 32 }}>
      Discover, browse, and purchase your favorite books with a beautiful, modern dark theme. Enjoy a seamless shopping experience and manage your orders and profile with ease.
    </p>
    <Link to="/books" className="btn" style={{ fontSize: '1.2rem', padding: '0.75rem 2.5rem', marginBottom: 40 }}>
      Start Exploring Books
    </Link>
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 32,
      justifyContent: 'center',
      marginTop: 24
    }}>
      <div className="card" style={{ minWidth: 220, textAlign: 'center' }}>
        <h3>Modern Dark Theme</h3>
        <p>Enjoy a beautiful, accessible, and responsive UI with gradients and a focus on readability.</p>
      </div>
      <div className="card" style={{ minWidth: 220, textAlign: 'center' }}>
        <h3>Easy Shopping</h3>
        <p>Browse, search, and add books to your cart. Place orders and track your history with ease.</p>
      </div>
      <div className="card" style={{ minWidth: 220, textAlign: 'center' }}>
        <h3>Admin Panel</h3>
        <p>Admins can manage users, books, orders, categories, and view analytics—all in your browser.</p>
      </div>
    </div>
  </div>
);

export default Home; 