import { RECEIVE_API, REQUEST_API } from '../actions';

const INITIAL_STATE = {
  questions: [],
  isFetched: false,
};

const triviaApi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state };

  case RECEIVE_API:
    return {
      ...state,
      questions: action.apiResult.results,
      isFetched: true,
    };

  default:
    return state;
  }
};

export default triviaApi;
