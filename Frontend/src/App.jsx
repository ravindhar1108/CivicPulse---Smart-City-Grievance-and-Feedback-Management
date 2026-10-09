import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import { Shield, LogOut, Home as HomeIcon, LayoutDashboard, UserPlus } from 'lucide-react';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function Navigation() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <Shield size={28} />
        CivicPulse
      </Link>
      <div className="navbar-links">
        <Link to="/" className="nav-link flex items-center gap-2">
          <HomeIcon size={18} /> Home
        </Link>
        {token ? (
          <>
            <Link to="/dashboard" className="nav-link flex items-center gap-2">
              <LayoutDashboard size={18} /> Dashboard
            </Link>
            <button onClick={handleLogout} className="btn btn-danger flex items-center gap-2">
              <LogOut size={18} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary flex items-center gap-2">
              <UserPlus size={18} /> Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
