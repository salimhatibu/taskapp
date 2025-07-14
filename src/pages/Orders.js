import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { Modal, Button } from '../components/common';

const Orders = () => {
  const { orders } = useData();
  const { user } = useAuth();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const userOrders = orders.filter(o => o.userId === user?.id);

  return (
    <div className="orders-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>My Orders</h2>
      {userOrders.length === 0 ? (
        <div>You have no orders yet.</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', minWidth: 600 }}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>{order.status}</td>
                  <td>${order.total?.toFixed(2)}</td>
                  <td><Button onClick={() => setSelectedOrder(order)}>View</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Modal isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
        {selectedOrder && (
          <div>
            <h3>Order #{selectedOrder.id}</h3>
            <div><b>Date:</b> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
            <div><b>Status:</b> {selectedOrder.status}</div>
            <div><b>Total:</b> ${selectedOrder.total?.toFixed(2)}</div>
            <h4 style={{ marginTop: 16 }}>Items:</h4>
            <ul>
              {selectedOrder.items.map(item => (
                <li key={item.id}>
                  {item.title} (x{item.quantity || 1}) - ${item.price?.toFixed(2)} each
                </li>
              ))}
            </ul>
            <Button onClick={() => setSelectedOrder(null)} style={{ marginTop: 16 }}>Close</Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders; 