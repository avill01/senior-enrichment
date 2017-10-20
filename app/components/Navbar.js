import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

function Navbar(props) {
  return (
    <div>
      <div id="navbar-title">
        <span>
          {props.location.pathname === '/'
            ? 'welcome'
            : props.location.pathname.match('students') ||
              props.location.pathname.match('campuses')}
        </span>
      </div>
      <div id="navbar">
        <div id="navbar-left">
          <NavLink exact to="/" activeClassName="active">
            <button>home</button>
          </NavLink>
          <NavLink to="/campuses" activeClassName="active">
            <button>campuses</button>
          </NavLink>
          <NavLink to="/students" activeClassName="active">
            <button>students</button>
          </NavLink>
        </div>
        {props.location.pathname.match('campuses') &&
          (props.location.pathname.match('add') ? (
            <NavLink to="/campuses">
              <button>add campus</button>
            </NavLink>
          ) : (
            <NavLink to="/campuses/add">
              <button>add campus</button>
            </NavLink>
          ))}
        {props.location.pathname.match('students') &&
          (props.location.pathname.match('add') ? (
            <NavLink to="/students">
              <button>add student</button>
            </NavLink>
          ) : (
            <NavLink to="/students/add">
              <button>add student</button>
            </NavLink>
          ))}
      </div>
    </div>
  );
}

export default withRouter(Navbar);
