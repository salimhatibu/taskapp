import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { Input, Button } from '../components/common';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { users } = useData();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (users.find(u => u.email === email)) {
      setError('Email already registered');
      return;
    }
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user',
      createdAt: Date.now(),
    };
    const updatedUsers = [...users, newUser];
    window.localStorage.setItem('users', JSON.stringify(updatedUsers));
    navigate('/login');
  };

  return (
    <div className="register-page card" style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} required />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>{error}</div>}
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Register; 