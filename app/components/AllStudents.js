import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
function AllStudents(props) {
  return (
      <table id="all-students">
        <tbody>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Campus</th>
            <th>Edit</th>
            <th>Delete</th>
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
    students: state.students
  };
}
export default withRouter(connect(mapStateToProps)(AllStudents));
