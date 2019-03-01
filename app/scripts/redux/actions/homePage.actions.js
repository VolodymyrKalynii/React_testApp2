import Consts from '../../lib/Constants';
import {MoviesLoader} from '../../lib/data-loader';

export const loadMoviesByPageNumber = pageNumber => dispatch =>
    MoviesLoader.load(pageNumber)
        .then(response => dispatch(saveMovies(response)));

export const loadMoviesByNameAndPage = (searchMovieName, pageNumber) => dispatch =>
    MoviesLoader.load2(pageNumber, searchMovieName)
        .then(response => dispatch(saveMovies2(response)));

const saveMovies = movies => ({
    type: Consts.LOAD_MOVIES_BY_PAGE_NAME,
    payload: {
        isMoviesLoaded: true,
        filteredSearch: false,
        moviesList: movies,
    }
});

const saveMovies2 = movies => ({
    type: Consts.LOAD_MOVIES_BY_NAME_AND_PAGE,
    payload: {
        isMoviesLoaded: true,
        filteredSearch: true,
        moviesList: movies,
    }
});
