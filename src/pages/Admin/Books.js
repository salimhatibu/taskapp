import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button, Modal, Input } from '../../components/common';
import Toast from '../../components/common/Toast';

const emptyBook = { title: '', author: '', price: '', stock: '', category: '', image: '' };

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

const AdminBooks = () => {
  const { books, setBooks, categories } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editBook, setEditBook] = useState(null);
  const [form, setForm] = useState(emptyBook);
  const [deleteId, setDeleteId] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [search, setSearch] = useState('');
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const openAdd = () => {
    setForm(emptyBook);
    setEditBook(null);
    setImageFile(null);
    setImagePreview('');
    setModalOpen(true);
  };
  const openEdit = (book) => {
    setForm(book);
    setEditBook(book);
    setImageFile(null);
    setImagePreview(book.image || '');
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditBook(null);
    setForm(emptyBook);
    setImageFile(null);
    setImagePreview('');
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const base64 = await toBase64(file);
      setImagePreview(base64);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let image = form.image;
    if (imageFile) {
      image = imagePreview;
    }
    if (editBook) {
      // Edit
      const updated = books.map(b => b.id === editBook.id ? { ...editBook, ...form, image, price: parseFloat(form.price), stock: parseInt(form.stock) } : b);
      setBooks(updated);
      window.localStorage.setItem('books', JSON.stringify(updated));
      setToast({ message: 'Book updated successfully!', type: 'success' });
    } else {
      // Add
      const newBook = { ...form, id: Date.now(), image, price: parseFloat(form.price), stock: parseInt(form.stock), createdAt: Date.now() };
      const updated = [...books, newBook];
      setBooks(updated);
      window.localStorage.setItem('books', JSON.stringify(updated));
      setToast({ message: 'Book added successfully!', type: 'success' });
    }
    closeModal();
  };
  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    const updated = books.filter(b => b.id !== deleteId);
    setBooks(updated);
    window.localStorage.setItem('books', JSON.stringify(updated));
    setDeleteId(null);
    setToast({ message: 'Book deleted successfully!', type: 'success' });
  };

  const filteredBooks = books.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="admin-books-page card" style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>Manage Books</h2>
      <input
        type="text"
        placeholder="Search books by title or author..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: '100%', maxWidth: 300, marginBottom: 16, padding: 8, borderRadius: 6, border: '1px solid var(--color-border)' }}
      />
      <Button style={{ marginBottom: 16 }} onClick={openAdd}>Add Book</Button>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', minWidth: 900 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.image && <img src={book.image} alt="cover" style={{ width: 40, height: 60, objectFit: 'cover', borderRadius: 4 }} />}</td>
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
      </div>
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
          <label>Book Cover Image:</label>
          <input type="file" accept="image/*" onChange={handleImageChange} style={{ width: '100%', marginBottom: 16 }} />
          {imagePreview && <img src={imagePreview} alt="preview" style={{ width: 80, height: 120, objectFit: 'cover', borderRadius: 4, marginBottom: 16 }} />}
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
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
    </div>
  );
};

export default AdminBooks; 