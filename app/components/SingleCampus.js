import React from 'react';
import { connect } from 'react-redux';

function SingleCampus(props) {
  console.log(props.match.params);
  console.log(props.campuses);
  const selectedCampus = props.campuses.find(
    campus => campus.id === +props.match.params.campusId
  );
  return <div>{selectedCampus.name}</div>;
}

function mapStateToProps(state) {
  return {
    campuses: state.campuses
  };
}

export default connect(mapStateToProps)(SingleCampus);
