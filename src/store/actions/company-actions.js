import { SET_COMPANY } from '../action-types';

export function setCompany (data) {
  return {
    type: SET_COMPANY,
    data
  };
}

export function setCompanyAsync (data) {
  return dispatch => {
    setTimeout(() => {
      dispatch(setCompany(data));
    }, 1000);
  }
}