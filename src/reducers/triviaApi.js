import { REQUEST_API } from '../actions';

const INITIAL_STATE = {
  questions: [],
};

const triviaApi = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return { ...state, questions: action.apiResult.results };
  default:
    return state;
  }
};

export default triviaApi;
