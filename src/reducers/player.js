import { SEND_PERFIL, SEND_SCORE, SEND_ASSERTION } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
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
      playerImageSrc: action.perfil.playerImgSrc,
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
  default:
    return state;
  }
};

export default player;
