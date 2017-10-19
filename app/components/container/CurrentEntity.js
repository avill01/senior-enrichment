import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { toggleEdit, setForm, save, extUpdateStudent } from '../../store';

function CurrentEntity(props) {
  // const selectedStudent = state.selectedStudent;
  // if (!selectedStudent) return null;
  const currEntity = props.currentEntity;
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
            props.save(currEntity.id, type, obj)
              .then(student => props.extUpdateStudent(student))
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
                <i
                  className="em em-floppy_disk"
                  onClick={() => {
                    document.getElementById('bio-form').submit();
                    props.toggleEdit();
                  }}
                />
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
              if (header === 'students') return <span key={header}>Oops</span>;
              else
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
      </div>
    </div>
  );
}

function headersFromEntity(entity) {
  return Object.keys(entity).filter(
    key => ['createdAt', 'updatedAt', 'name', 'id'].indexOf(key) === -1
  );
}

function mapStateToProps(state) {
  return {
    currentEntity: state.currentEntity,
    editForm: state.editForm,
    edit: state.edit
  };
}

const mapDispatchToProps = { toggleEdit, setForm, save, extUpdateStudent };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CurrentEntity)
);
