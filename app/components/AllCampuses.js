import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';

import { removeCampus } from '../store';

function AllCampuses(props) {
  return (
      <table id="all-campuses">
        <tbody>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>students</th>
            <th>view</th>
            <th>delete</th>
          </tr>
          {props.campuses.map(campus => (
            <tr key={campus.id}>
              <td>{campus.id}</td>
              <td>{campus.name}</td>
              <td>{props.students.filter(student => student.campusId === campus.id).length}</td>
              <td>
                <button>☰</button>
              </td>
              <td>
                <button onClick={(evt) => {
                  evt.preventDefault();
                  props.removeCampus(campus.id);
                }}>X</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  );
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses,
    students: state.students
  };
}

const mapDispatch = { removeCampus };

export default withRouter(connect(mapStateToProps)(AllCampuses));
