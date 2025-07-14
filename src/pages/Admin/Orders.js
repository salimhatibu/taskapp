import React from 'react';
import { useData } from '../../context/DataContext';
import { Button } from '../../components/common';

const AdminOrders = () => {
  const { orders, users } = useData();
  // TODO: Implement update/delete logic using DataContext

  return (
    <div className="admin-orders-page card" style={{ maxWidth: 1000, margin: '2rem auto' }}>
      <h2>Manage Orders</h2>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Order #</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => {
            const user = users.find(u => u.id === order.userId);
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{user ? user.name : 'Unknown'}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>${order.total?.toFixed(2)}</td>
                <td>
                  <Button onClick={() => alert('Update order coming soon!')}>Update</Button>
                  <Button style={{ marginLeft: 8, background: 'var(--color-secondary)' }} onClick={() => alert('Delete order coming soon!')}>Delete</Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminOrders; 