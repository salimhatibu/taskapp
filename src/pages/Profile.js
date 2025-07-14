import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Input, Button } from '../components/common';

const Profile = () => {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [editing, setEditing] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    // TODO: Save changes to user in DataContext and localStorage
    setEditing(false);
    alert('Profile update coming soon!');
  };

  return (
    <div className="profile-page card" style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>User Profile</h2>
      {editing ? (
        <form onSubmit={handleSave}>
          <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
          <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
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
    </div>
  );
};

export default Profile; 