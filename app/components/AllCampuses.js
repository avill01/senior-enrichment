import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { removeCampus, deleteStudent } from '../store';

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
        {props.campuses.map(campus => {
          const numStudents = props.students.filter(
            student => student.campusId === campus.id
          ).length;
          return (
            <tr key={campus.id}>
              <td>{campus.id}</td>
              <td>{campus.name}</td>
              <td>{numStudents}</td>
              <td>
                <button>☰</button>
              </td>
              <td>
                <button
                  onClick={evt => {
                    evt.preventDefault();
                    if (
                      confirm(
                        `Are you sure?\nThis will also delete ${numStudents} student record(s) associated with ${campus.name}.`
                      )
                    ) {
                      campus.students.forEach(student =>
                        props.deleteStudent(student.id)
                      );
                      props.removeCampus(campus.id);
                    }
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          );
        })}
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

const mapDispatch = { removeCampus, deleteStudent };

export default withRouter(connect(mapStateToProps, mapDispatch)(AllCampuses));
