import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { Input, Button, Toast } from '../components/common';

const Profile = () => {
  const { user, login } = useAuth();
  const { users, setUsers } = useData();
  const [name, setName] = useState(user?.name || '');
  const [editing, setEditing] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' });

  const handleSave = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name };
    const updatedUsers = users.map(u => u.id === user.id ? updatedUser : u);
    setUsers(updatedUsers);
    window.localStorage.setItem('users', JSON.stringify(updatedUsers));
    login(updatedUser); // update auth context
    setEditing(false);
    setToast({ message: 'Profile updated successfully!', type: 'success' });
  };

  return (
    <div className="profile-page card" style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>User Profile</h2>
      {editing ? (
        <form onSubmit={handleSave}>
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" type="email" value={user?.email} disabled />
          <Button type="submit">Save</Button>
          <Button type="button" onClick={() => setEditing(false)} style={{ marginLeft: 12 }}>Cancel</Button>
        </form>
      ) : (
        <>
          <div style={{ marginBottom: 12 }}><b>Name:</b> {user?.name}</div>
          <div style={{ marginBottom: 12 }}><b>Email:</b> {user?.email}</div>
          <div style={{ marginBottom: 12 }}><b>Role:</b> {user?.role}</div>
          <Button onClick={() => setEditing(true)}>Edit Profile</Button>
        </>
      )}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: 'success' })} />
    </div>
  );
};

export default Profile; 