import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

export function getCampuses(campuses) {
  return { type: GET_CAMPUSES, campuses };
}
export function addCampus(campus) {
  return { type: ADD_CAMPUS, campus };
}
export function deleteCampus(id) {
  return { type: DELETE_CAMPUS, id };
}
export function updateCampus(campus) {
  return { type: UPDATE_CAMPUS, campus };
}


export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    case ADD_CAMPUS:
      return [...state, action.campus];
    case DELETE_CAMPUS:
      return state.filter(el => el.id !== action.id);
    case UPDATE_CAMPUS:
      return state.map(
        campus => (action.campus.id === campus.id ? action.campus : campus)
      );
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
      campus.students = [];
      if (!campus.id) alert('That campus already exists!');
      else dispatch(addCampus(campus));
    })
    .catch(console.error);
};
export const removeCampus = id => dispatch => {
  return axios
    .delete(`/api/campuses/${id}`)
    .then(res => {
      if (res.status === 204) {
        dispatch(deleteCampus(id));
      }
    })
    .catch(console.error);
};
export const updateCampusRequest = (id, body) => dispatch => {
  return axios
    .put(`/api/campuses/${id}`, body)
    .then(campus => {
      console.log('new campus', campus);
      dispatch(updateCampus(campus));
    })
    .catch(console.error);
};
