import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice.jsx';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ name: '', email: '', cnic: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock API call to register user
    const mockToken = "fake-jwt-token";
    dispatch(login({ user: formData, token: mockToken }));
    alert("Registration successful!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="CNIC"
        onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
