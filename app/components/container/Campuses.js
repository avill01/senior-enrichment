import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';

import { removeCampus, deleteStudent, setCurrentEntity } from '../../store';
import AddCampus from './AddCampus';
import CurrentEntity from './CurrentEntity';
import TableList from '../presentational/TableList';

function Campuses(props) {
  return (
    <div>
      <Switch>
        <Route exact path="/campuses/add" component={AddCampus} />
        <Route path="/campuses/:campusId" component={CurrentEntity} />
      </Switch>
      <TableList
        type="campuses"
        entities={props.campuses}
        removeEntity={props.removeCampus}
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
