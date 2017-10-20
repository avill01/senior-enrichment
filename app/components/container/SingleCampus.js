import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import EditField from './EditField';

import {
  toggleEdit,
  extUpdateStudent,
  updateStudentRecord,
  updateCampusRequest
} from '../../store';

class SingleCampus extends Component {
  componentWillUnmount() {
    if (this.props.edit) this.props.toggleEdit();
  }

  handleSubmitAllEdits(evt) {
    evt.preventDefault();

    const edittedCampus = {};
    edittedCampus.name = evt.target.name.value;
    edittedCampus.id = evt.target.id.value;
    edittedCampus.address = evt.target.address.value;
    edittedCampus.image = evt.target.image.value;

    this.props
      .updateCampusRequest(this.props.currentEntity.id, edittedCampus)
      .then(() => this.props.toggleEdit())
      .catch(console.error);
  }

  handleSubmitStudent(evt) {
    evt.preventDefault();
    const selectedStudent = this.props.students.find(
      student => student.id === +evt.target.studentSelect.value
    );
    const newStudent = Object.assign({}, selectedStudent, {
      campusId: this.props.currentEntity.id
    });
    console.log(newStudent);
    this.props.updateStudentRecord(newStudent);
  }

  render() {
    const currentEntity = this.props.currentEntity;
    if (!currentEntity) return null;
    return (
      <div id="single-campus-content">
        <div id="left-bar">
          <img src={currentEntity.image} />
        </div>
        <div className="bio">
          <form id="bio-form" onSubmit={this.handleSubmitAllEdits}>
            <div className="bio-title">
              <EditField header={'name'} />
              {this.props.edit ? (
                <i
                  className="em em-floppy_disk"
                  onClick={this.props.toggleEdit}
                />
              ) : (
                <i className="em em-pencil" onClick={this.props.toggleEdit} />
              )}
            </div>
            <EditField header={'id'} />
            <EditField header={'address'} />
            <EditField header={'image'} />
          </form>
          <div>students:</div>
          <div className="bio students-list">
            {currentEntity.students.map(student => (
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.name} - id: {student.id}
                </Link>
              </div>
            ))}
            <form id="add-student-form" onSubmit={this.handleSubmitStudent}>
              <select name="studentSelect" defaultValue="default">
                <option value="default" disabled hidden>
                  add student
                </option>
                {this.props.students
                  .filter(student => student.campusId !== currentEntity.id)
                  .map(student => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
              </select>
              <button type="submit">add</button>
            </form>
            <br />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentEntity: state.currentEntity,
    editForm: state.editForm,
    campuses: state.campuses,
    students: state.students,
    edit: state.edit
  };
}

const mapDispatchToProps = {
  toggleEdit,
  extUpdateStudent,
  updateStudentRecord,
  updateCampusRequest
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
);
