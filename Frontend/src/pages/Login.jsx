import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would hit the backend:
      // const res = await fetch('http://localhost:8080/api/auth/login', { ... })
      // For demonstration, we'll mock it based on email
      
      let role = 'CITIZEN';
      if (email.includes('admin')) role = 'ADMIN';
      if (email.includes('officer')) role = 'OFFICER';

      setTimeout(() => {
        localStorage.setItem('token', 'mock-jwt-token');
        localStorage.setItem('role', role);
        navigate('/dashboard');
      }, 800);
      
    } catch (err) {
      setError('Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center" style={{ minHeight: '60vh' }}>
      <div className="card animate-fade-in" style={{ width: '100%', maxWidth: '400px' }}>
        <h2 className="text-center mb-4">Welcome Back</h2>
        {error && <div className="mb-4 text-center" style={{ color: 'var(--danger)' }}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@civicpulse.com"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-input" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
            {loading ? 'Authenticating...' : 'Login'}
          </button>
        </form>
        <p className="text-center mt-4 text-secondary" style={{ fontSize: '0.9rem' }}>
          Mock Info: Use 'admin' or 'officer' in email to change roles.
        </p>
      </div>
    </div>
  );
}
