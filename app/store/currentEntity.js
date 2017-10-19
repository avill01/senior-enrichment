const SET_CURRENT_ENTITY = 'SET_CURRENT_ENTITY';

export const setCurrentEntity = entity => ({
  type: SET_CURRENT_ENTITY,
  entity
});

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_CURRENT_ENTITY:
      return action.entity;
    default:
      return state;
  }
};

export default reducer;
