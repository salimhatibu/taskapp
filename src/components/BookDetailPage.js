import React from "react";
import { useParams, Link } from "react-router-dom";
import { booksData } from "../App";
import "./BookDetailPage.css";

function BookDetailPage() {
  const { id } = useParams();
  const book = booksData.find((book) => book.id === parseInt(id));

  if (!book) {
    return (
      <div className="book-detail-page">
        <div className="book-not-found">
          <h2>Book not found!</h2>
          <Link to="/" className="back-to-books-btn">
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="book-detail-page">
      <div className="book-detail-container">
        <Link to="/" className="back-to-books-btn">
          ← Back to Books
        </Link>

        <div className="book-detail-content">
          <div className="book-detail-image">
            <img src={book.image} alt={book.title} />
          </div>

          <div className="book-detail-info">
            <h1 className="book-detail-title">{book.title}</h1>
            <p className="book-detail-author">by {book.author}</p>
            <p className="book-detail-genre">Genre: {book.genre}</p>
            <p className="book-detail-price">${book.price}</p>

            <div className="book-detail-stats">
              <p>
                <strong>Pages:</strong> {book.pages}
              </p>
              <p>
                <strong>Published:</strong> {book.publishedYear}
              </p>
            </div>

            <div className="book-detail-description">
              <h3>Description</h3>
              <p>{book.description}</p>
            </div>

            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
