import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="navbar-title">
      ExerTracker
    </Link>
    <ul className="navbar-nav">
      <li className="navbar-item">
        <Link to="/" className="nav-link">
          Exercises
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/create" className="nav-link">
          Create Exercise Log
        </Link>
      </li>
      <li className="navbar-item">
        <Link to="/user" className="nav-link">
          Login
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;