import React from "react";
import { Link } from "react-router-dom";
import { booksData } from "../App";
import "./BooksPage.css";

function BooksPage() {
  return (
    <div className="books-page">
      <div className="books-container">
        <h2>Available Books</h2>
        <div className="books-grid">
          {booksData.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.image} alt={book.title} className="book-image" />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">by {book.author}</p>
                <p className="book-genre">{book.genre}</p>
                <p className="book-price">${book.price}</p>
                <Link to={`/book/${book.id}`} className="view-details-btn">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BooksPage;
