import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

// import { connect } from 'react-redux';

function Navbar(props) {
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
            <button>home</button>
          </NavLink>
          <NavLink to="/campuses" activeClassName="active">
            <button>campuses</button>
          </NavLink>
          <NavLink to="/students" activeClassName="active">
            <button>students</button>
          </NavLink>
        </div>
        {props.location.pathname === '/campuses' && (
          <NavLink to="/campuses/add">
            <button>add</button>
          </NavLink>
        )}
        {props.location.pathname === '/students' && (
          <NavLink to="/students/add">
            <button>add</button>
          </NavLink>
        )}
      </div>
    </div>
  );
}

export default withRouter(Navbar);
