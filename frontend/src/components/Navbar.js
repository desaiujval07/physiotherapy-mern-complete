import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">
          <h2>PhysioLife</h2>
        </Link>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/therapists">Therapists</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          {user ? (
            <>
              <li><Link to="/appointments">My Appointments</Link></li>
              {user.role === 'admin' && (
                <li><Link to="/dashboard">Dashboard</Link></li>
              )}
              <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
            </>
          ) : (
            <>
              <li><Link to="/login" className="btn-login">Login</Link></li>
              <li><Link to="/register" className="btn-register">Register</Link></li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;