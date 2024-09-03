// components/auth/ForgotPassword.jsx
import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserService.requestPasswordReset(email);
      setMessage('OTP has been sent to your email.');
      setTimeout(() => {
        navigate('/reset-password');
      }, 3000);
    } catch (error) {
      setError('Failed to send OTP. Please check your email.');
      setTimeout(() => setError(''), 5000);
    }
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send OTP</button>
      </form>
    </div>
  );
}

export default ForgotPassword;