import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

function AllCampuses(props) {
  console.log(props.campuses);
  return (
      <table id="all-campuses">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Students</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
          {props.campuses.map(campus => (
            <tr key={campus.id}>
              <td>{campus.id}</td>
              <td>{campus.name}</td>
              <td>{campus.students.length}</td>
              <td>
                <button>☰</button>
              </td>
              <td>
                <button>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses
  };
}

export default withRouter(connect(mapStateToProps)(AllCampuses));
