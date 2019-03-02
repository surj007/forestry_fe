import { SET_COMPANY } from '../action-types';

export function setCompany(data) {
  return {
    type: SET_COMPANY,
    data
  };
}