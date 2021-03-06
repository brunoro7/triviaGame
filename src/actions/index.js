export const SEND_TOKEN = 'SEND_TOKEN';
export const SEND_PERFIL = 'SEND_PERFIL';

export const REQUEST_API = 'REQUEST_API';
export const RECEIVE_API = 'RECEIVE_API';

export const SEND_SCORE = 'SEND_SCORE';
export const SEND_ASSERTION = 'SEND_ASSERTION';
export const SEND_PLAYER_IMG = 'SEND_PLAYER_IMG';

export const RESET_GAME = 'RESET_GAME';

export const resetGame = () => ({
  type: RESET_GAME,
});

export const sendToken = (token) => ({
  type: SEND_TOKEN,
  token,
});

export const sendPerfil = (perfil) => ({
  type: SEND_PERFIL,
  perfil,
});

export const requestApi = () => ({
  type: REQUEST_API,
});

export const receiveApi = (apiResult) => ({
  type: RECEIVE_API,
  apiResult,
});

export const sendScore = (score) => ({
  type: SEND_SCORE,
  score,
});

export const sendAssertion = (assertion) => ({
  type: SEND_ASSERTION,
  assertion,
});
