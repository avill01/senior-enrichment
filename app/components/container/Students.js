import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { removeStudent, setCurrentEntity } from '../../store';
import CurrentEntity from './CurrentEntity';
import AddStudent from './AddStudent';
import TableList from '../presentational/TableList';

function Students(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/students/add" component={AddStudent} />
        <Route path="/students/:campusId" component={CurrentEntity} />
      </Switch>
      <TableList
        type="students"
        entities={props.students}
        removeEntity={props.removeStudent}
        selectEntity={props.setCurrentEntity}
      />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    students: state.students
  };
}

const mapDispatch = { removeStudent, setCurrentEntity };

export default withRouter(connect(mapStateToProps, mapDispatch)(Students));
