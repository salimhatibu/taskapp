import React from 'react';
import { useData } from '../../context/DataContext';

const AdminReports = () => {
  const { users, books, orders } = useData();
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  return (
    <div className="admin-reports-page card" style={{ maxWidth: 700, margin: '2rem auto' }}>
      <h2>Reports & Analytics</h2>
      <div style={{ display: 'flex', gap: 32, marginBottom: 32 }}>
        <div><b>Total Users:</b> {users.length}</div>
        <div><b>Total Books:</b> {books.length}</div>
        <div><b>Total Orders:</b> {orders.length}</div>
        <div><b>Total Revenue:</b> ${totalRevenue.toFixed(2)}</div>
      </div>
      <div>Charts and analytics coming soon!</div>
    </div>
  );
};

export default AdminReports; 