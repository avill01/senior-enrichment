const TOGGLE_EDIT = 'TOGGLE_EDIT';

export const toggleEdit = () => ({
  type: TOGGLE_EDIT
});

const reducer = (state = false, action) => {
  switch (action.type) {
    case TOGGLE_EDIT:
      return !state;
    default:
      return state;
  }
};

export default reducer;
