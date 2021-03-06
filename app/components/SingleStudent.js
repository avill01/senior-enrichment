import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import EditField from './EditField';

import {
  toggleEdit,
  fetchOneCampus,
  fetchOneStudent,
  setCurrentEntity,
  updateStudentRequest
} from '../store';

class SingleStudent extends Component {
  constructor(props) {
    super(props);

    this.handleSubmitAllEdits = this.handleSubmitAllEdits.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchOneStudent(this.props.match.params.id)
      .then(student => this.props.setCurrentEntity(student));
  }

  componentWillUnmount() {
    if (this.props.edit) this.props.toggleEdit();
  }

  handleSubmitAllEdits(evt) {
    evt.preventDefault();

    const edittedStudent = {};
    edittedStudent.id = evt.target.id.value;
    edittedStudent.email = evt.target.email.value;
    edittedStudent.address = evt.target.address.value;
    edittedStudent.name = evt.target.name.value;
    edittedStudent.image = evt.target.image.value;
    edittedStudent.campusId = evt.target.campusId.value;

    this.props
      .updateStudentRequest(this.props.currentEntity.id, edittedStudent)
      .then(student => {
        this.props.setCurrentEntity(student);
        this.props.toggleEdit();
      })
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
            <EditField header={'email'} />
            <EditField header={'address'} />
            <EditField header={'image'} />
            <div id="campus-link">
              <Link to={`/campuses/${currentEntity.campusId}`}>
                <i
                  className="em em-fire"
                  onClick={() =>
                    this.props
                      .fetchOneCampus(currentEntity.campusId)
                      .then(
                        campus =>
                          console.log(campus) ||
                          this.props.setCurrentEntity(campus)
                      )
                      .catch(console.error)}
                />
              </Link>
              <EditField header={'campusId'} />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    edit: state.edit,
    students: state.students,
    currentEntity: state.currentEntity
  };
}

const mapDispatchToProps = {
  toggleEdit,
  fetchOneCampus,
  fetchOneStudent,
  setCurrentEntity,
  updateStudentRequest
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleStudent)
);
