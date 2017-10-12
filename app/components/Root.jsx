import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';

export default class Root extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <Header />
        <Router>
          <Route exact
        </Router>
        <Footer />
      </div>
    );
  }
}
