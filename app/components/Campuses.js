import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import { removeCampus, deleteStudent, setCurrentEntity } from '../store';

import SingleCampus from './SingleCampus';
import AddCampus from './AddCampus';
import TableList from './TableList';

function Campuses(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/campuses/add" component={AddCampus} />
        <Route path="/campuses/:id" component={SingleCampus} />
      </Switch>
      <TableList
        type="campuses"
        entities={props.campuses}
        removeEntity={id => {
          props.students
            .filter(student => student.campusId === id)
            .forEach(student => props.deleteStudent(student.id));
          props.removeCampus(id);
        }}
        selectEntity={props.setCurrentEntity}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses,
    students: state.students
  };
}

const mapDispatch = { removeCampus, deleteStudent, setCurrentEntity };

export default withRouter(connect(mapStateToProps, mapDispatch)(Campuses));
