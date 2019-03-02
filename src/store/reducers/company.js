import { SET_COMPANY } from '../action-types';

export default (state = {}, action) => {
  switch(action.type) {
    case SET_COMPANY:
      return action.data;
    default:
      return state;
  }
};