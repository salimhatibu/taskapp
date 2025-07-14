import React from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/common';

const AdminBooks = () => {
  const { books } = useData();
  // TODO: Implement add/edit/delete logic using DataContext

  return (
    <div className="admin-books-page card" style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>Manage Books</h2>
      <Button style={{ marginBottom: 16 }} onClick={() => alert('Add book coming soon!')}>Add Book</Button>
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
                <Button onClick={() => alert('Edit book coming soon!')}>Edit</Button>
                <Button style={{ marginLeft: 8, background: 'var(--color-secondary)' }} onClick={() => alert('Delete book coming soon!')}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminBooks; 