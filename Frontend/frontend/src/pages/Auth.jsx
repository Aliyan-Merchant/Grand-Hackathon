import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import './Auth.css';
import axios from 'axios';

const Auth = () => {
  const dispatch = useDispatch();
  const [isLoginMode, setIsLoginMode] = useState(true); // Toggle between Sign Up and Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // For Sign Up
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState(''); // For reset email
  const [showResetForm, setShowResetForm] = useState(false); // Toggle reset form visibility

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      dispatch(login({ user: { name: response.data.user.name }, token: response.data.token }));
      alert('Login successful!');
    } catch (err) {
      setError('Invalid email or password.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/signup', { name, email, password });
      alert('Sign-up successful!');
      setIsLoginMode(true); // Switch to login after sign-up
    } catch (err) {
      setError('Error creating account. Please try again.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/auth/reset-password', { email: resetPasswordEmail });
      alert('Password reset link sent to your email!');
      setShowResetForm(false); // Close the reset form after submission
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <div className="toggle-buttons">
        <button className={isLoginMode ? 'active' : ''} onClick={() => setIsLoginMode(true)}>
          Login
        </button>
        <button className={!isLoginMode ? 'active' : ''} onClick={() => setIsLoginMode(false)}>
          Sign Up
        </button>
      </div>

      {showResetForm ? (
        <form onSubmit={handleResetPassword} className="auth-form">
          <h2>Reset Password</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Enter your email"
            value={resetPasswordEmail}
            onChange={(e) => setResetPasswordEmail(e.target.value)}
            required
          />
          <button type="submit" className="auth-btn">
            Send Reset Link
          </button>
        </form>
      ) : isLoginMode ? (
        <form onSubmit={handleLoginSubmit} className="auth-form">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="show-password-btn">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className="auth-btn">
            Login
          </button>
          <p className="forgot-password-link" onClick={() => setShowResetForm(true)}>
            Forgot Password?
          </p>
        </form>
      ) : (
        <form onSubmit={handleSignUpSubmit} className="auth-form">
          <h2>Sign Up</h2>
          {error && <p className="error-message">{error}</p>}
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className="password-input">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="show-password-btn">
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" className="auth-btn">
            Sign Up
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;
