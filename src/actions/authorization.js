import * as types from '../constants/types';

export const setUserProfile = role => ({
  type: types.SET_USER_PROFILE,
  payload: role,
});
