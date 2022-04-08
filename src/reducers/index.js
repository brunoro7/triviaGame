import { combineReducers } from 'redux';
import player from './player';
import token from './token';
import triviaApi from './triviaApi';

const rootReducer = combineReducers({ player, token, triviaApi });

export default rootReducer;
