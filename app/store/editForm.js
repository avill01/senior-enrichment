import axios from 'axios';

const SET_FORM = 'SET_FORM';

export const setForm = originalForm => {
  const form = Object.assign({}, originalForm);
  delete form.createdAt;
  delete form.updatedAt;
  delete form.id;
  return { type: SET_FORM, form };
};

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_FORM:
      return action.form;
    default:
      return state;
  }
};

export const save = (id, type, form) => dispatch => {
  return axios
    .put(`/api/${type}/${id}`, form)
    .then(res => res.data)
    .catch(console.error);
};

export default reducer;
