import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import store, { fetchCampuses, fetchStudents } from '../store';

import Navbar from './Navbar';
import Welcome from './Welcome';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import SingleCampus from './SingleCampus';

export default class Root extends Component {
  componentDidMount() {
    store.dispatch(fetchCampuses());
    store.dispatch(fetchStudents());
  }

  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <Route exact path="/" component={Welcome} />
          <Route exact path="/campus" component={AllCampuses} />
          <Route path="/campus/:campusId" component={SingleCampus} />
          <Route exact path="/student" component={AllStudents} />
        </div>
      </div>
    );
  }
}
