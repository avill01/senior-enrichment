import React, { Component } from 'react';
import { connect } from 'react-redux';

import { createStudent } from '../store';

class AddStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      campusId: 'default'
    };
    this.submit = this.submit.bind(this);
  }

  submit(evt) {
    evt.preventDefault();
    this.props.createStudent(this.state);
    this.setState({ name: '', email: '', campusId: 'default' });
  }

  render() {
    return (
      <div id="form-container">
        <form onSubmit={this.submit}>
          <span>add student:</span>
          <input
            required
            name="name"
            type="text"
            placeholder="name"
            value={this.state.name}
            onChange={evt => this.setState({ name: evt.target.value })}
          />
          <input
            required
            name="email"
            type="email"
            placeholder="email"
            value={this.state.email}
            onChange={evt => this.setState({ email: evt.target.value })}
          />
          <select
            required
            value={this.state.campusId}
            onChange={evt => this.setState({ campusId: evt.target.value })}
          >
            <option value="default" disabled hidden>
              campus
            </option>
            {this.props.campuses.map(campus => (
              <option key={campus.id} value={campus.id}>
                {campus.name}
              </option>
            ))}
          </select>
          <button type="submit">submit</button>
        </form>
      </div>
    );
  }
}

const mapState = state => ({
  campuses: state.campuses
});

const mapDispatch = { createStudent };

export default connect(mapState, mapDispatch)(AddStudent);
