import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import {
  toggleEdit,
  setForm,
  save,
  extUpdateStudent,
  updateStudentRecord,
  setCurrentEntity
} from '../../store';

class CurrentEntity extends React.Component {
  // const selectedStudent = state.selectedStudent;
  // if (!selectedStudent) return null;
  componentWillUnmount() {
    //turns off editing mode when you navigate away from the edit screen
    if (this.props.edit) this.props.toggleEdit();
  }
  render() {
    const props = this.props;
    const currEntity = props.currentEntity;
    if (!currEntity.id) return null;

    return (
      <div id="single-campus-content">
        <div id="left-bar">
          <img src={currEntity.image} />
        </div>
        <div className="bio">
          <form
            id="bio-form"
            onSubmit={evt => {
              evt.preventDefault();
              const obj = {};
              obj.name = evt.target.name.value;
              obj.id = currEntity.id;
              headersFromEntity(currEntity).forEach(header => {
                obj[header] = evt.target[header].value;
              });
              if (obj.campusId) obj.campusId = +obj.campusId;
              const type = props.editForm.campusId ? 'students' : 'campuses';
              props
                .save(currEntity.id, type, obj)
                .then(student => {
                  props.extUpdateStudent(student);
                  props.setCurrentEntity(student);
                })
                .then(() => props.toggleEdit())
                .catch(console.error);
            }}
          >
            <div className="bio-title">
              {props.edit ? (
                <input name="name" type="text" defaultValue={currEntity.name} />
              ) : (
                <span>{currEntity.name}</span>
              )}
              {props.edit ? (
                <button type="submit" className="em em-floppy_disk" />
              ) : (
                <i
                  className="em em-pencil"
                  onClick={() => {
                    props.setForm(currEntity);
                    props.toggleEdit();
                  }}
                />
              )}
            </div>
            <div className="bio-info">
              <span>{'id: ' + currEntity.id}</span>
              {headersFromEntity(currEntity).map(header => {
                return (
                  <div key={header}>
                    <span>{header}: </span>
                    {props.edit ? (
                      <input
                        name={header}
                        type="text"
                        defaultValue={props.editForm[header]}
                      />
                    ) : (
                      <span>{currEntity[header]}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </form>
          {currEntity.students ? (
            <div key="students-list">
              <span key="students-array">students: </span>
              <ul>
                {currEntity.students.map(student => (
                  <li
                    key={student.id}
                    onClick={() => {
                      props.history.push(`/students/${student.id}`);
                      props.setCurrentEntity(student);
                    }}
                  >
                    {student.name}
                  </li>
                ))}
                <li>
                  <form
                    id="add-student-form"
                    onSubmit={evt => {
                      evt.preventDefault();
                      const selectedStudent = this.props.students.find(
                        student =>
                          student.id === +evt.target.studentSelect.value
                      );
                      const newStudent = Object.assign({}, selectedStudent, {
                        campusId: currEntity.id
                      });
                      console.log(newStudent);
                      this.props.updateStudentRecord(newStudent);
                    }}
                  >
                    <select name="studentSelect" defaultValue="default">
                      <option value="default" disabled hidden>
                        add student
                      </option>
                      {this.props.students
                        .filter(student => student.campusId !== currEntity.id)
                        .map(student => (
                          <option key={student.id} value={student.id}>
                            {student.name}
                          </option>
                        ))}
                    </select>
                    <button type="submit">add</button>
                  </form>
                </li>
              </ul>
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

function headersFromEntity(entity) {
  return Object.keys(entity).filter(
    key =>
      ['createdAt', 'updatedAt', 'name', 'id', 'students'].indexOf(key) === -1
  );
}

function mapStateToProps(state) {
  return {
    currentEntity: state.currentEntity,
    students: state.students,
    editForm: state.editForm,
    edit: state.edit
  };
}

const mapDispatchToProps = {
  toggleEdit,
  setForm,
  save,
  extUpdateStudent,
  setCurrentEntity,
  updateStudentRecord
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CurrentEntity)
);
