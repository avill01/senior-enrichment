import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCampuses, fetchStudents } from '../store';

import Navbar from './container/Navbar';
import Campuses from './container/Campuses';
import Students from './container/Students';

class Root extends Component {
  componentDidMount() {
    this.props.fetchCampuses();
    this.props.fetchStudents();
  }

  render() {
    return (
      <div id="main">
        <Navbar />
          <Route path="/campuses" component={Campuses} />
          <Route path="/students" component={Students} />
          <Route redirect="/" />
      </div>
    );
  }
}

const mapDispatch = { fetchStudents, fetchCampuses };

export default withRouter(connect(null, mapDispatch)(Root));
