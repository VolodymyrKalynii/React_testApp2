import Consts from '../../lib/Constants';
import {MoviesLoader} from '../../lib/data-loader';

/**
 * @param {number} pageNumber
 * @return {function(*): Promise<T | never>}
 */
const loadMoviesByPageNumber = pageNumber => dispatch =>
    MoviesLoader.load(pageNumber)
        .then(response => dispatch(saveMovies(response)));

/**
 * @param {string} searchMovieName
 * @param {number} pageNumber
 * @return {function(*): Promise<T | never>}
 */
const loadMoviesByNameAndPage = (searchMovieName, pageNumber) => dispatch =>
    MoviesLoader.load2(pageNumber, searchMovieName)
        .then(response => dispatch(saveMovies2(response)));

/**
 * @param {{}} movies
 * @return {{type: string, payload: {isMoviesLoaded: boolean, filteredSearch: boolean, moviesList: *}}}
 */
const saveMovies = movies => ({
    type: Consts.LOAD_MOVIES_BY_PAGE_NAME,
    payload: {
        isMoviesLoaded: true,
        filteredSearch: false,
        moviesList: movies,
    }
});

/**
 * @param {{}} movies
 * @return {{type: string, payload: {isMoviesLoaded: boolean, filteredSearch: boolean, moviesList: *}}}
 */
const saveMovies2 = movies => ({
    type: Consts.LOAD_MOVIES_BY_NAME_AND_PAGE,
    payload: {
        isMoviesLoaded: true,
        filteredSearch: true,
        moviesList: movies,
    }
});

export default {
    loadMoviesByPageNumber,
    loadMoviesByNameAndPage
}