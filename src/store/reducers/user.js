import { SET_USER, DEL_USER } from '../action-types';

export default (state = {}, action) => {
  switch(action.type) {
    case SET_USER:
      return action.data;
    case DEL_USER:
      return {};
    default:
      return state;
  }
};