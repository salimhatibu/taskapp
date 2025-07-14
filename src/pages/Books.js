import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Loader, Button, Toast } from '../components/common';

const Books = () => {
  const { books, categories } = useData();
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const filteredBooks = books.filter(
    b =>
      (b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author?.toLowerCase().includes(search.toLowerCase())) &&
      (!category || b.category === category)
  );

  const handleAddToCart = (book) => {
    addToCart({ ...book, quantity: 1 });
    setToast({ message: 'Book added to cart!', type: 'success' });
  };

  return (
    <div className="books-page">
      <h2>Books</h2>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ maxWidth: 300, padding: 8, borderRadius: 6, border: '1px solid var(--color-border)' }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ maxWidth: 200, padding: 8, borderRadius: 6, border: '1px solid var(--color-border)' }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      {books.length === 0 ? (
        <Loader />
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
          {filteredBooks.map(book => (
            <div className="card" key={book.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              {book.image && <img src={book.image} alt={book.title} style={{ width: 120, height: 180, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />}
              <h3 style={{ margin: '0 0 8px 0' }}>{book.title}</h3>
              <div style={{ color: '#aaa', marginBottom: 8 }}>{book.author}</div>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>${book.price?.toFixed(2)}</div>
              <Link to={`/books/${book.id}`} className="btn" style={{ width: '100%', marginBottom: 8 }}>View Details</Link>
              {isAuthenticated && !isAdmin && (
                <Button onClick={() => handleAddToCart(book)} style={{ width: '100%' }}>Add to Cart</Button>
              )}
            </div>
          ))}
        </div>
      )}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
    </div>
  );
};

export default Books; 