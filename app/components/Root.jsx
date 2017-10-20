import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCampuses, fetchStudents } from '../store';

import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';

class Root extends Component {
  componentDidMount() {
    this.props.fetchCampuses();
    this.props.fetchStudents();
  }

  render() {
    return (
      <div id="main">
        <Navbar />
        <Route path="/campuses" component={AllCampuses} />
        <Route path="/students" component={AllStudents} />
        <Route redirect="/" />
      </div>
    );
  }
}

const mapDispatch = { fetchStudents, fetchCampuses };

export default withRouter(connect(null, mapDispatch)(Root));
