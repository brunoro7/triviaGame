import { requestApi } from '../actions';

const fetchTriviaApi = (token) => {
  const urlTrivia = `https://opentdb.com/api.php?amount=5&token=${token}`;

  return async (dispatch) => {
    const fetchTrivia = await fetch(urlTrivia);
    const apiResult = await fetchTrivia.json();
    return dispatch(requestApi(apiResult));
  };
};

export default fetchTriviaApi;
