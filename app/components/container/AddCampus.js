import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createCampus } from '../../store';

class AddCampus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
    this.props.createCampus({name: this.state.name});
    this.setState({ name: '', students: [] });
  }

  render() {
    return (
      <div id="form-container">
        <form onSubmit={this.submit}>
          <span>add campus:</span>
          <input
            required
            name="name"
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={evt => this.setState({ name: evt.target.value })}
          />
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  students: state.students
});

const mapDispatch = { createCampus };

export default withRouter(connect(mapState, mapDispatch)(AddCampus));
