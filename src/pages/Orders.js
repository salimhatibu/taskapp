import React from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { orders } = useData();
  const { user } = useAuth();

  const userOrders = orders.filter(o => o.userId === user?.id);

  return (
    <div className="orders-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>My Orders</h2>
      {userOrders.length === 0 ? (
        <div>You have no orders yet.</div>
      ) : (
        <table style={{ width: '100%' }}>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {userOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>{order.status}</td>
                <td>${order.total?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders; 