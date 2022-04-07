import { requestApi, receiveApi } from '../actions';

const fetchTriviaApi = (token) => {
  const urlTrivia = `https://opentdb.com/api.php?amount=5&token=${token}`;

  return async (dispatch) => {
    dispatch(requestApi());
    const fetchTrivia = await fetch(urlTrivia);
    const apiResult = await fetchTrivia.json();
    return dispatch(receiveApi(apiResult));
  };
};

export default fetchTriviaApi;
