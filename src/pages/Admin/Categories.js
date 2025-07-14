import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button, Modal, Input } from '../../components/common';

const emptyCategory = { name: '', parentId: '' };

const AdminCategories = () => {
  const { categories, setCategories } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [form, setForm] = useState(emptyCategory);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setForm(emptyCategory);
    setEditCategory(null);
    setModalOpen(true);
  };
  const openEdit = (cat) => {
    setForm(cat);
    setEditCategory(cat);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditCategory(null);
    setForm(emptyCategory);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editCategory) {
      // Edit
      const updated = categories.map(c => c.id === editCategory.id ? { ...editCategory, ...form } : c);
      setCategories(updated);
      window.localStorage.setItem('categories', JSON.stringify(updated));
    } else {
      // Add
      const newCategory = { ...form, id: Date.now() };
      const updated = [...categories, newCategory];
      setCategories(updated);
      window.localStorage.setItem('categories', JSON.stringify(updated));
    }
    closeModal();
  };
  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    const updated = categories.filter(c => c.id !== deleteId);
    setCategories(updated);
    window.localStorage.setItem('categories', JSON.stringify(updated));
    setDeleteId(null);
  };

  return (
    <div className="admin-categories-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>Manage Categories</h2>
      <Button style={{ marginBottom: 16 }} onClick={openAdd}>Add Category</Button>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Parent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map(cat => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.name}</td>
              <td>{cat.parentId ? categories.find(c => c.id === Number(cat.parentId))?.name || '-' : '-'}</td>
              <td>
                <Button onClick={() => openEdit(cat)}>Edit</Button>
                <Button style={{ marginLeft: 8, background: 'var(--color-secondary)' }} onClick={() => confirmDelete(cat.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h3>{editCategory ? 'Edit Category' : 'Add Category'}</h3>
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <label>Parent Category:</label>
          <select name="parentId" value={form.parentId} onChange={handleChange} style={{ width: '100%', marginBottom: 16 }}>
            <option value="">None</option>
            {categories.filter(c => !editCategory || c.id !== editCategory.id).map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={closeModal} style={{ marginLeft: 12 }}>Cancel</Button>
        </form>
      </Modal>
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this category?</p>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={() => setDeleteId(null)} style={{ marginLeft: 12 }}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default AdminCategories; 