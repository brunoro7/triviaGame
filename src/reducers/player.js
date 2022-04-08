import { SEND_PERFIL } from '../actions';

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
  default:
    return state;
  }
};

export default player;
