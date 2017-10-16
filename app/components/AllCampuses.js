import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

function AllCampuses(props) {
  return (
    <div>
      {props.campuses.map(campus => (
        <div key={campus.id}>
          <NavLink to={`/campus/${campus.id}`}>{campus.name}</NavLink>
        </div>
      ))}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses
  };
}

export default withRouter(connect(mapStateToProps)(AllCampuses));
