import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common';

const BookDetails = () => {
  const { id } = useParams();
  const { books } = useData();
  const { addToCart } = useCart();
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();

  const book = books.find(b => String(b.id) === String(id));
  if (!book) return <div className="card">Book not found.</div>;

  const handleAddToCart = () => {
    addToCart({ ...book, quantity: 1 });
    navigate('/cart');
  };

  return (
    <div className="book-details-page card" style={{ maxWidth: 600, margin: '2rem auto' }}>
      {book.image && <img src={book.image} alt={book.title} style={{ width: 160, height: 240, objectFit: 'cover', borderRadius: 8, float: 'right', marginLeft: 24 }} />}
      <h2>{book.title}</h2>
      <div style={{ color: '#aaa', marginBottom: 8 }}>{book.author}</div>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>${book.price?.toFixed(2)}</div>
      <div style={{ marginBottom: 12 }}>{book.description}</div>
      <div style={{ marginBottom: 8 }}>Genre: {book.genre}</div>
      <div style={{ marginBottom: 8 }}>Pages: {book.pages}</div>
      <div style={{ marginBottom: 8 }}>Published: {book.publishedYear}</div>
      {isAuthenticated && !isAdmin && (
        <Button onClick={handleAddToCart}>Add to Cart</Button>
      )}
    </div>
  );
};

export default BookDetails; 