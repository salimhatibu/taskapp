import React, { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { seedData } from '../utils/data';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    seedData();
    setBooks(storage.get('books', []));
    setUsers(storage.get('users', []));
    setOrders(storage.get('orders', []));
    setCategories(storage.get('categories', []));
  }, []);

  // Example CRUD actions for books
  const addBook = (book) => {
    const updated = [...books, book];
    setBooks(updated);
    storage.set('books', updated);
  };
  const updateBook = (book) => {
    const updated = books.map((b) => (b.id === book.id ? book : b));
    setBooks(updated);
    storage.set('books', updated);
  };
  const deleteBook = (id) => {
    const updated = books.filter((b) => b.id !== id);
    setBooks(updated);
    storage.set('books', updated);
  };
  // Similar CRUD for users, orders, categories can be added

  return (
    <DataContext.Provider value={{ books, users, orders, categories, addBook, updateBook, deleteBook }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
} 