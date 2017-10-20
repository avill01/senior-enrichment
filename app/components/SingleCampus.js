import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import EditField from './EditField';

import {
  toggleEdit,
  fetchOneCampus,
  setCurrentEntity,
  updateCampusRequest,
  updateStudentRequest
} from '../store';

class SingleCampus extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitStudent = this.handleSubmitStudent.bind(this);
    this.handleSubmitAllEdits = this.handleSubmitAllEdits.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchOneCampus(this.props.match.params.id)
      .then(campus => this.props.setCurrentEntity(campus));
  }

  componentWillUnmount() {
    if (this.props.edit) this.props.toggleEdit();
  }

  handleSubmitAllEdits(evt) {
    evt.preventDefault();

    const edittedCampus = {};
    edittedCampus.id = evt.target.id.value;
    edittedCampus.name = evt.target.name.value;
    edittedCampus.image = evt.target.image.value;
    edittedCampus.address = evt.target.address.value;

    this.props
      .updateCampusRequest(this.props.currentEntity.id, edittedCampus)
      .then(campus => {
        this.props.setCurrentEntity(campus);
        this.props.toggleEdit();
      })
      .catch(console.error);
  }

  handleSubmitStudent(evt) {
    evt.preventDefault();
    const studentId = +evt.target.studentSelect.value;
    this.props
      .updateStudentRequest(studentId, {
        campusId: this.props.currentEntity.id
      })
      .then(student => this.props.fetchOneCampus(student.campusId))
      .then(campus => this.props.setCurrentEntity(campus))
      .catch(console.error);
  }

  render() {
    const currentEntity = this.props.currentEntity;
    if (!currentEntity.id) return null;
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
                <button type="submit" className="em em-floppy_disk" />
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
            {currentEntity.students &&
              currentEntity.students.map(student => (
                <div
                  key={student.id}
                  onClick={() => {
                    this.props.setCurrentEntity(student);
                  }}
                >
                  <Link to={`/students/${student.id}`}>
                    <i className="em em-fire" />
                  </Link>
                  {student.name} - id: {student.id}
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
    edit: state.edit,
    editForm: state.editForm,
    campuses: state.campuses,
    students: state.students,
    currentEntity: state.currentEntity
  };
}

const mapDispatchToProps = {
  toggleEdit,
  fetchOneCampus,
  setCurrentEntity,
  updateCampusRequest,
  updateStudentRequest
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
);
