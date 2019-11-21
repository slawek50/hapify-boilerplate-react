// A Redux middleware that interprets actions,
// And performs the call to push the MODELS to the server

// import { FETCH_ALL_POSTS_SUCCESS } from '../modules/posts';
// import { setMessage } from '../modules/globals';

// const oberserverActions = [FETCH_ALL_POSTS_SUCCESS];

export default (store) => (next) => (action) => {
  const nextResponse = next(action);

  // if (action && action.type && oberserverActions.indexOf(action.type) >= 0) {
  //   store.dispatch(setMessage(''));
  // }

  return nextResponse;
};
