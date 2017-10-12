import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <div>
      <NavLink to="/" activeClassName="active">
        <button>Home</button>
      </NavLink>
      <NavLink to="/campus" activeClassName="active">
        <button>Campuses</button>
      </NavLink>
      <NavLink to="/student" activeClassName="active">
        <button>Students</button>
      </NavLink>
    </div>
  );
}
