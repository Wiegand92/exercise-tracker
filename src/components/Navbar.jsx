import React from 'react';
import {NavLink, Link} from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" exact className="navbar-title">
      ExerTracker
    </Link>
    <ul className="navbar-nav">
      <li className="navbar-item">
        <NavLink to="/" exact className="nav-link">
          Exercises
        </NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/create" className="nav-link">
          Create Exercise Log
        </NavLink>
      </li>
      <li className="navbar-item">
        <NavLink to="/user" className="nav-link">
          Login
        </NavLink>
      </li>
    </ul>
  </nav>
);

export default Navbar;
