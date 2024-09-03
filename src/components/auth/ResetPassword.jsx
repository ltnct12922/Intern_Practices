// // components/auth/ResetPassword.jsx
// import React, { useState } from 'react';
// import UserService from '../service/UserService';
// import { useNavigate } from 'react-router-dom';

// function ResetPassword() {
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (newPassword !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await UserService.resetPassword(otp, newPassword);
//       setMessage('Password has been reset successfully.');
//       setTimeout(() => {
//         navigate('/login');
//       }, 3000);
//     } catch (error) {
//       setError('Failed to reset password. Please check your OTP or try again.');
//       setTimeout(() => setError(''), 5000);
//     }
//   };

//   return (
//     <div className="auth-container">
//       <h2>Reset Password</h2>
//       {message && <p className="success-message">{message}</p>}
//       {error && <p className="error-message">{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>OTP Code: </label>
//           <input
//             type="text"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>New Password: </label>
//           <input
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm Password: </label>
//           <input
//             type="password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">Reset Password</button>
//       </form>
//     </div>
//   );
// }

// export default ResetPassword;
// src/components/auth/ResetPassword.jsx
import React, { useState } from 'react';
import UserService from '../service/UserService';
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleVerifyOtp = async () => {
    try {
      const response = await UserService.verifyOtp(otp, email); // Verify OTP first
      setMessage(response.data); // Show success message
    } catch (error) {
      setError('Failed to verify OTP. Please check your OTP or try again.');
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await UserService.changePassword(email, newPassword); // Change password after OTP verification
      setMessage('Password has been reset successfully.');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // First verify the OTP
    await handleVerifyOtp();

    // If OTP verification succeeds, change the password
    if (!error) {
      await handleChangePassword();
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
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
        <div className="form-group">
          <label>OTP Code: </label>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password: </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password: </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
