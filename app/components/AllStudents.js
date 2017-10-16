import React from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter} from 'react-router-dom';

function AllStudents(props) {
  return (
    <div>
      {props.students.map(student => <div key={student.id}>{student.name}</div>)}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    students: state.students
  };
}

export default withRouter(connect(mapStateToProps)(AllStudents));
