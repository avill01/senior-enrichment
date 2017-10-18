import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import store, { fetchCampuses, fetchStudents } from '../store';

import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';
import SingleStudent from './SingleStudent';

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());
  }

  render() {
    return (
      <div id="main">
        <Navbar />
        <div>
          <Route exact path="/" />
          <Route exact path="/campuses" component={AllCampuses} />
          <Route path="/campus/:campusId" component={SingleCampus} />
          <Route exact path="/students" component={AllStudents} />
          <Route redirect="/" />
        </div>
      </div>
    );
  }
}


//<Route path="/student/:studentId" component={SingleStudent} />
