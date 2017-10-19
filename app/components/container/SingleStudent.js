import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleEdit } from '../../store';

import CurrentEntity from './CurrentEntity';

class SingleStudent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedStudent: this.props.students.find(
        student => student.id === +this.props.match.params.studentId
      )
    };
  }
  render() {
    const selectedStudent = this.state.selectedStudent;
    if (!selectedStudent) return null;
    return (
      <div id="single-campus-content">
        <CurrentEntity />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    students: state.students,
    campuses: state.campuses,
    edit: state.edit
  };
}

const mapDispatchToProps = { toggleEdit };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
);
