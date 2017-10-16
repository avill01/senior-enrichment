import axios from 'axios';

const GET_CAMPUSES = 'GET_CAMPUSES';

export function getCampuses(campuses) {
  return { type: GET_CAMPUSES, campuses };
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

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
}
