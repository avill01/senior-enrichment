import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';

export function getCampuses(campuses) {
  return { type: GET_CAMPUSES, campuses };
}
export function addCampus(campus) {
  return { type: ADD_CAMPUS, campus };
}
export function deleteCampus(id) {
  return { type: DELETE_CAMPUS, id };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return [...state, action.campus];
    default:
      return state;
  }
}

export function fetchCampuses() {
  return function thunk(dispatch) {
    return axios
      .get('/api/campuses')
      .then(res => res.data)
      .then(campuses => {
        dispatch(getCampuses(campuses));
      })
      .catch(console.error);
  };
}

export const createCampus = body => dispatch => {
  return axios
    .post('/api/campuses', body)
    .then(res => res.data)
    .then(campus => {
      if (!campus.id) alert('That campus already exists!');
      else dispatch(addCampus(campus));
    })
    .catch(console.error);
};

export const removeCampus = id => dispatch => {
  return axios
    .post(`/api/campuses/${id}`)
    .then(res => {
      if (res.status === 204) {
        dispatch(deleteCampus(id));
      }
    })
    .catch(console.error);
};
