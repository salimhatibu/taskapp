import React from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/common';

const AdminCategories = () => {
  const { categories } = useData();
  // TODO: Implement add/edit/delete logic using DataContext

  return (
    <div className="admin-categories-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>Manage Categories</h2>
      <Button style={{ marginBottom: 16 }} onClick={() => alert('Add category coming soon!')}>Add Category</Button>
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
              <td>{cat.parentId ? cat.parentId : '-'}</td>
              <td>
                <Button onClick={() => alert('Edit category coming soon!')}>Edit</Button>
                <Button style={{ marginLeft: 8, background: 'var(--color-secondary)' }} onClick={() => alert('Delete category coming soon!')}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminCategories; 