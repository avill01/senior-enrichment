import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';

export function getStudents(students) {
  return { type: GET_STUDENTS, students };
}

export function fetchStudents() {
  return function thunk(dispatch) {
    return axios
      .get('/api/students')
      .then(res => res.data)
      .then(students => {
        dispatch(getStudents(students));
      })
      .catch(console.error);
  };
}

export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    default:
      return state;
  }
}
