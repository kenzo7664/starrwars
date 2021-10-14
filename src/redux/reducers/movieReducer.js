import { movieConstants } from '../constants';
import initialState from './initialState';

const movieReducer = (state = initialState.movies, action) => {
  switch (action.type) {
    case movieConstants.MOVIES_START:
      return {
        ...state,
        current: {},
        loading: true,
      };
    case movieConstants.GET_MOVIES_SUCCESS:
      return {
        ...state,
        list: action.payload.results,
        loading: false,
      };
    case movieConstants.GET_MOVIES_FAILURE:
      return {
        ...state,
        list: [],
        loading: false,
      };
    case movieConstants.SET_MOVIE_SUCCESS:
      return {
        ...state,
        current: action.payload,
        loading: false,
      };
    case movieConstants.SET_MOVIE_FAILURE:
      return {
        ...state,
        current: {},
        loading: false,
      };
    case movieConstants.CHARACTER_START:
      return {
        ...state,
        [action.payload.key]: [],
      };
    case movieConstants.GET_CHARACTER_SUCCESS:
      return {
        ...state,
        [action.payload.key]:
          state[action.payload.key] !== undefined
            ? [...state[action.payload.key].concat(action.payload.details)]
            : [action.payload.details],
      };
    case movieConstants.GET_CHARACTER_FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default movieReducer;
