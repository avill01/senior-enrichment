import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import Navbar from './Navbar';
import Welcome from './Welcome';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';

export default class Root extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div className="main">
          <Route exact path="/" component={Welcome} />
          <Route path="/campus" component={AllCampuses} />
          <Route path="/student" component={AllStudents} />
        </div>
      </div>
    );
  }
}
