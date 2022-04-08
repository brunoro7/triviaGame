import { SEND_PERFIL, SEND_SCORE, SEND_ASSERTION, SEND_PLAYER_IMG } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
  playerImgSrc: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SEND_PERFIL:
    return {
      ...state,
      name: action.perfil.name,
      gravatarEmail: action.perfil.email,
    };
  case SEND_SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case SEND_ASSERTION:
    return {
      ...state,
      assertions: Number(state.assertions) + action.assertion,
    };
  case SEND_PLAYER_IMG:
    return {
      ...state,
      playerImgSrc: action.imgSource,
    };
  default:
    return state;
  }
};

export default player;
