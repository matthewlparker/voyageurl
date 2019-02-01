import * as reducers from './reducers';
import * as types from '../constants/types';

describe('userProfile reducer', () => {
  it('should return the initial state', () => {
    expect(reducers.userProfile(undefined, {})).toEqual({ role: '' });
  });

  it('should handle SET_USER_PROFILE', () => {
    expect(
      reducers.userProfile(undefined, {
        type: types.SET_USER_PROFILE,
        payload: 'User',
      })
    ).toEqual({ role: 'User' });
  });
});
