import * as actions from './authorization';
import * as types from '../constants/types';

it('should create an action to set logged in status', () => {
  const payload = 'User';
  const expectedAction = {
    type: types.SET_USER_PROFILE,
    payload: 'User',
  };
  expect(actions.setUserProfile(payload)).toEqual(expectedAction);
});
