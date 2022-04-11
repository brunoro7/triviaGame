import { RECEIVE_API, REQUEST_API, RESET_GAME } from '../actions';

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
  case RESET_GAME:
    return {
      ...state,
      isFetched: false,
    };

  default:
    return state;
  }
};

export default triviaApi;
