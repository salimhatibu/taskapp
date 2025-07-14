import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Button, Modal, Input } from '../../components/common';

const emptyUser = { name: '', email: '', password: '', role: 'user' };

const AdminUsers = () => {
  const { users, setUsers } = useData();
  const [modalOpen, setModalOpen] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [form, setForm] = useState(emptyUser);
  const [deleteId, setDeleteId] = useState(null);

  const openAdd = () => {
    setForm(emptyUser);
    setEditUser(null);
    setModalOpen(true);
  };
  const openEdit = (user) => {
    setForm(user);
    setEditUser(user);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setEditUser(null);
    setForm(emptyUser);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editUser) {
      // Edit
      const updated = users.map(u => u.id === editUser.id ? { ...editUser, ...form } : u);
      setUsers(updated);
      window.localStorage.setItem('users', JSON.stringify(updated));
    } else {
      // Add
      const newUser = { ...form, id: Date.now(), createdAt: Date.now() };
      const updated = [...users, newUser];
      setUsers(updated);
      window.localStorage.setItem('users', JSON.stringify(updated));
    }
    closeModal();
  };
  const confirmDelete = (id) => setDeleteId(id);
  const handleDelete = () => {
    const updated = users.filter(u => u.id !== deleteId);
    setUsers(updated);
    window.localStorage.setItem('users', JSON.stringify(updated));
    setDeleteId(null);
  };

  return (
    <div className="admin-users-page card" style={{ maxWidth: 900, margin: '2rem auto' }}>
      <h2>Manage Users</h2>
      <Button style={{ marginBottom: 16 }} onClick={openAdd}>Add User</Button>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <Button onClick={() => openEdit(user)}>Edit</Button>
                <Button style={{ marginLeft: 8, background: 'var(--color-secondary)' }} onClick={() => confirmDelete(user.id)}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <h3>{editUser ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={handleSubmit}>
          <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} required />
          <Input label="Password" name="password" type="password" value={form.password} onChange={handleChange} required={!editUser} />
          <label>Role:</label>
          <select name="role" value={form.role} onChange={handleChange} style={{ width: '100%', marginBottom: 16 }}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <Button type="submit">Save</Button>
          <Button type="button" onClick={closeModal} style={{ marginLeft: 12 }}>Cancel</Button>
        </form>
      </Modal>
      <Modal isOpen={!!deleteId} onClose={() => setDeleteId(null)}>
        <h3>Confirm Delete</h3>
        <p>Are you sure you want to delete this user?</p>
        <Button onClick={handleDelete}>Delete</Button>
        <Button onClick={() => setDeleteId(null)} style={{ marginLeft: 12 }}>Cancel</Button>
      </Modal>
    </div>
  );
};

export default AdminUsers; 