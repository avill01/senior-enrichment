import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { toggleEdit } from '../../store';

class SingleCampus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCampus: this.props.campuses.find(
        campus => campus.id === +this.props.match.params.campusId
      )
    };
  }
  render() {
    const selectedCampus = this.state.selectedCampus;
    if (!selectedCampus) return null;
    return (
      <div id="single-campus-content">
        <div id="left-bar">
          <img src={selectedCampus.image} />
        </div>
        <div className="bio">
          <div className="bio-title">
            {this.props.edit ? (
              <input
                name="name"
                type="text"
                defaultValue={selectedCampus.name}
              />
            ) : (
              <span> {selectedCampus.name}</span>
            )}
            {this.props.edit ? (
              <i
                className="em em-floppy_disk"
                onClick={this.props.toggleEdit}
              />
            ) : (
              <i className="em em-pencil" onClick={this.props.toggleEdit} />
            )}
          </div>
          <div>students:</div>
          <div className="bio students-list">
            {selectedCampus.students.map(student => (
              <div key={student.id}>
                <Link to={`/students/${student.id}`}>
                  {student.name} - id: {student.id}
                </Link>
              </div>
            ))}
            <br />
          </div>
          <div>
            img url:{' '}
            {this.props.edit ? (
              <input
                name="image"
                type="text"
                defaultValue={selectedCampus.image}
              />
            ) : (
              <span> {selectedCampus.image}</span>
            )}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses,
    edit: state.edit
  };
}

const mapDispatchToProps = { toggleEdit };

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SingleCampus)
);
