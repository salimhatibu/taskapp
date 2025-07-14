import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Loader } from '../components/common';

const Books = () => {
  const { books } = useData();
  const [search, setSearch] = useState('');

  const filteredBooks = books.filter(
    b =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="books-page">
      <h2>Books</h2>
      <input
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', maxWidth: 400, marginBottom: 24, padding: 8, borderRadius: 6, border: '1px solid var(--color-border)' }}
      />
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
              <Link to={`/books/${book.id}`} className="btn" style={{ width: '100%' }}>View Details</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Books; 