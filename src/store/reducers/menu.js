import { SET_MENU, DEL_MENU } from '../action-types';

export default (state = [], action) => {
  switch(action.type) {
    case SET_MENU:
      return action.data;
    case DEL_MENU:
      return [];
    default:
      return state;
  }
};