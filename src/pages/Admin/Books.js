import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button, Modal, Input } from '../../components/common';

const emptyBook = { title: '', author: '', price: '', stock: '', category: '', image: '' };

const AdminBooks = () => {
  const { books, setBooks, categories } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState(emptyBook);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setForm(emptyBook);
    setEditBook(null);
    setModalOpen(true);
  };
  const openEdit = (book) => {
    setForm(book);
    setEditBook(book);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditBook(null);
    setForm(emptyBook);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editBook) {
      // Edit
      const updated = books.map(b => b.id === editBook.id ? { ...editBook, ...form, price: parseFloat(form.price), stock: parseInt(form.stock) } : b);
      setBooks(updated);
      window.localStorage.setItem('books', JSON.stringify(updated));
    } else {
      // Add
      const newBook = { ...form, id: Date.now(), price: parseFloat(form.price), stock: parseInt(form.stock), createdAt: Date.now() };
      const updated = [...books, newBook];
      setBooks(updated);
      window.localStorage.setItem('books', JSON.stringify(updated));
    }
    closeModal();
  };
  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    const updated = books.filter(b => b.id !== deleteId);
    setBooks(updated);
    window.localStorage.setItem('books', JSON.stringify(updated));
    setDeleteId(null);
  };

  return (
    <div className="admin-books-page card" style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>Manage Books</h2>
      <Button style={{ marginBottom: 16 }} onClick={openAdd}>Add Book</Button>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>${book.price?.toFixed(2)}</td>
              <td>{book.stock ?? '-'}</td>
              <td>{book.category ?? '-'}</td>
              <td>
                <Button onClick={() => openEdit(book)}>Edit</Button>
                <Button style={{ marginLeft: 8, background: 'var(--color-secondary)' }} onClick={() => confirmDelete(book.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h3>{editBook ? 'Edit Book' : 'Add Book'}</h3>
        <form onSubmit={handleSubmit}>
          <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Author" name="author" value={form.author} onChange={handleChange} required />
          <Input label="Price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} required />
          <Input label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} required />
          <label>Category:</label>
          <select name="category" value={form.category} onChange={handleChange} style={{ width: '100%', marginBottom: 16 }}>
            <option value="">Select category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
          <Input label="Image URL" name="image" value={form.image} onChange={handleChange} />
          <Button type="submit">Save</Button>
          <Button type="button" onClick={closeModal} style={{ marginLeft: 12 }}>Cancel</Button>
        </form>
      </Modal>
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this book?</p>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={() => setDeleteId(null)} style={{ marginLeft: 12 }}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default AdminBooks; 