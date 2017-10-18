import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchCampuses, fetchStudents } from '../store';

import Navbar from './Navbar';
import AllCampuses from './AllCampuses';
import AllStudents from './AllStudents';
import AddCampus from './AddCampus';
import AddStudent from './AddStudent';
import SingleCampus from './SingleCampus';
// import SingleStudent from './SingleStudent';

class Root extends Component {
  componentDidMount() {
    this.props.fetchCampuses();
    this.props.fetchStudents();
  }

  render() {
    return (
      <div id="main">
        <Navbar />
        <div>
          <Route exact path="/" />
          <Route exact path="/campuses/add" component={AddCampus} />
          <Route path="/campuses" component={AllCampuses} />
          <Route path="/campus/:campusId" component={SingleCampus} />
          <Route exact path="/students/add" component={AddStudent} />
          <Route path="/students" component={AllStudents} />
          <Route redirect="/" />
        </div>
      </div>
    );
  }
}

const mapDispatch = { fetchStudents, fetchCampuses };

export default withRouter(connect(null, mapDispatch)(Root));

//<Route path="/student/:studentId" component={SingleStudent} />
