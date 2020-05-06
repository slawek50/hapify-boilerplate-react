// A Redux middleware that interprets actions,
// And performs the call to push the MODELS to the server

// import { FETCH_OPTION_SUCCESS } from '../modules/options';
// import { setConfig } from '../modules/globals';

// const oberserverActions = [FETCH_OPTION_SUCCESS];

export default (store) => (next) => (action) => {
  const nextResponse = next(action);

  // if (action && action.type && oberserverActions.indexOf(action.type) >= 0) {
  //   store.dispatch(setConfig(....));
  // }

  return nextResponse;
};
