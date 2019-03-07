import Consts from '../Constants';
import {MoviesGetterByPageName} from '../../lib/data-getter';

/**
 * @param {number} pageNumber
 * @return {function(*=): void}
 */
const loadMoviesByPageNumber = pageNumber => dispatch =>
    MoviesGetterByPageName.getByPage(pageNumber, saveMovies, dispatch);

/**
 * @param {string} searchMovieName
 * @param {number} pageNumber
 * @return {function(*=): void}
 */
const loadMoviesByNameAndPage = (searchMovieName, pageNumber) => dispatch =>
    MoviesGetterByPageName.getByPageAndName(pageNumber, searchMovieName, saveMovies2, dispatch);

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