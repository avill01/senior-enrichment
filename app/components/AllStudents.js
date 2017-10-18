import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { removeStudent } from '../store';

function AllStudents(props) {
  return (
      <table id="all-students">
        <tbody>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>campus</th>
            <th>view</th>
            <th>delete</th>
          </tr>
          {props.students.map(student => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.campusId}</td>
              <td>
                <button>☰</button>
              </td>
              <td>
                <button onClick={(evt) => {
                  evt.preventDefault();
                  confirm('Are you sure?') && props.removeStudent(student.id);
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
    students: state.students
  };
}

const mapDispatch = { removeStudent };

export default withRouter(connect(mapStateToProps, mapDispatch)(AllStudents));
