import * as types from '../constants/types';

const initialState = {
  role: '',
};

export const userProfile = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.SET_USER_PROFILE:
      return {
        ...state,
        role: payload,
      };
    default:
      return state;
  }
};
