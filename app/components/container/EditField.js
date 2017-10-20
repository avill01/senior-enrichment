import React from 'react';
import { connect } from 'react-redux';

function EditField(props) {
  return (
    <div key={props.header}>
      <span>{props.header}: </span>
      {props.edit ? (
        <input
          name={props.header}
          type="text"
          defaultValue={props.currentEntity[props.header]}
        />
      ) : (
        <span>{props.currentEntity[props.header]}</span>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    currentEntity: state.currentEntity,
    edit: state.edit
  };
}

export default connect(mapStateToProps)(EditField);
