import Axios from 'axios';
import { movieConstants } from '../constants';

const proxy = (resourceUrl) => `https://api.allorigins.win/get?url=${encodeURIComponent(`${resourceUrl}`)}`;

const moviesStart = (payload) => ({
  type: movieConstants.MOVIES_START,
  payload,
});

const characterStart = (payload) => ({
  type: movieConstants.CHARACTER_START,
  payload,
});

const getMoviesSuccess = (payload) => ({
  type: movieConstants.GET_MOVIES_SUCCESS,
  payload,
});

const getMoviesFailure = (error) => ({
  type: movieConstants.GET_MOVIES_FAILURE,
  payload: error,
});

export const getMovies = () => async (dispatch) => {
  dispatch(moviesStart());
  try {
    const { data } = await Axios.get(proxy('https://swapi.dev/api/films'));
    dispatch(getMoviesSuccess(JSON.parse(data.contents)));
  } catch (error) {
    dispatch(getMoviesFailure(error));
  }
};

const setCurrentMovieSuccess = (payload) => ({
  type: movieConstants.SET_MOVIE_SUCCESS,
  payload,
});

const setCurrentMovieFailure = (error) => ({
  type: movieConstants.SET_MOVIE_FAILURE,
  payload: error,
});

export const setCurrentMovie = (movie) => async (dispatch) => {
  dispatch(moviesStart());
  try {
    const { data } = await Axios.get(proxy(movie.url));
    dispatch(setCurrentMovieSuccess(JSON.parse(data.contents)));
  } catch (error) {
    dispatch(setCurrentMovieFailure(error));
  }
};

export const resetCharacters = (key) => async (dispatch) => {
  dispatch(characterStart({ key }));
};

const getMovieCharacterSuccess = (payload) => ({
  type: movieConstants.GET_CHARACTER_SUCCESS,
  payload,
});

const getMovieCharacterFailure = (error) => ({
  type: movieConstants.GET_CHARACTER_FAILURE,
  payload: error,
});

export const getCharacter = (key, character) => async (dispatch) => {
  try {
    const { data } = await Axios.get(proxy(character));
    dispatch(
      getMovieCharacterSuccess({
        key,
        details: JSON.parse(data.contents),
      }),
    );
  } catch (error) {
    dispatch(getMovieCharacterFailure(error));
  }
};
