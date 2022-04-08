import { SEND_PERFIL, SEND_SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: 0,
  gravatarEmail: '',
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
  default:
    return state;
  }
};

export default player;
