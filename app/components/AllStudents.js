import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Switch, Route } from 'react-router-dom';

import { removeStudent, setCurrentEntity } from '../store';
import SingleStudent from './SingleStudent';
import AddStudent from './AddStudent';
import TableList from './TableList';

function Students(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/students/add" component={AddStudent} />
        <Route path="/students/:id" component={SingleStudent} />
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
    students: state.students,
    campuses: state.campuses
  };
}

const mapDispatch = { removeStudent, setCurrentEntity };

export default withRouter(connect(mapStateToProps, mapDispatch)(Students));
