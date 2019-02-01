export default store => next => action => {
  if (process.env.NODE_ENV === 'production') {
    return next(action);
  }
  console.group(action.type);
  console.log('%c prev state', 'color: gray', store.getState());
  console.log('%c action', 'color: blue', action);
  const returnValue = next(action);
  console.log('%c next state', 'color: green', store.getState());
  console.groupEnd(action.type);
  return returnValue;
};
