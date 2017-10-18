import axios from 'axios';

const GET_STUDENTS = 'GET_STUDENTS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT =  'DELETE_STUDENT';

export function getStudents(students) {
  return { type: GET_STUDENTS, students };
}
export function addStudent(student) {
  return { type: ADD_STUDENT, student };
}
export function deleteStudent(id) {
  return { type: DELETE_STUDENT, id};
}


export default function reducer(state = [], action) {
  switch (action.type) {
    case GET_STUDENTS:
      return action.students;
    case ADD_STUDENT:
      return [...state, action.student];
    case DELETE_STUDENT:
      return state.filter(el => el.id !== action.id);
    default:
      return state;
  }
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
export const createStudent = body => dispatch => {
  return axios
    .post('/api/students', body)
    .then(res => res.data)
    .then(student => {
      dispatch(addStudent(student));
    })
    .catch(console.error);
};
export const removeStudent = id => dispatch => {
  return axios
    .delete(`/api/students/${id}`)
    .then(res => {
      if (res.status === 204) {
        dispatch(deleteStudent(id));
      }
    })
    .catch(console.error);
};
