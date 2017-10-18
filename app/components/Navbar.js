import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';

function Navbar(props) {
  console.log(props);
  return (
    <div>
      <div id="navbar-title">
        <span>
          {props.location.pathname === '/'
            ? '/welcome'
            : props.location.pathname}
        </span>
      </div>
      <div id="navbar">
        <div id="navbar-left">
          <NavLink to="/" activeClassName="active">
            <button>Home</button>
          </NavLink>
          <NavLink to="/campuses" activeClassName="active">
            <button>Campuses</button>
          </NavLink>
          <NavLink to="/students" activeClassName="active">
            <button>Students</button>
          </NavLink>
        </div>
        {(props.location.pathname === '/campuses' ||
          props.location.pathname === '/students') && <button>Add</button>}
      </div>
    </div>
  );
}

export default withRouter(Navbar);
