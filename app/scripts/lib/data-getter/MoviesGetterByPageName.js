import {MoviesLoader} from '../data-loader/index';

export class MoviesGetterByPageName {
    static getByPage(pageNumber, saveMovies, dispatch) {
        MoviesLoader.loadByPage(pageNumber)
            .then(response => dispatch(saveMovies(response)));
    }

    static getByPageAndName(pageNumber, searchMovieName, saveMovies2, dispatch) {
        MoviesLoader.loadByPageAndName(pageNumber, searchMovieName)
            .then(response => dispatch(saveMovies2(response)));
    }
}
