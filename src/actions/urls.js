import * as types from '../constants/types';

export const setVisitorURLs = visitorURLs => ({
  type: types.SET_VISITOR_URLS,
  payload: visitorURLs,
});
