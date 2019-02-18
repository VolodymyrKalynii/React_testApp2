import Constants from '../lib/Constants';

export default class RequestsURLsCreator {

    static loadMovieById(movieId) {
        return `${Constants.API_ROOT}/movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`
    }

    static loadPopularMoviesByPageNumber(pageNumber) {
        return `${Constants.API_ROOT}/movie/popular?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`
    }

    static loadPopularMoviesByNameAndPageNumber(pageNumber, movieName) {
        return `${Constants.API_ROOT}/search/movie?api_key=${Constants.API_KEY}&language=en-US&query=${movieName}&page=${pageNumber}`
    }

    static loadRecommendedMoviesByIdAndPageNumber(movieId, pageNumber) {
        return `${Constants.API_ROOT}/movie/${movieId}/recommendations?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`
    }

    static loadGenres () {
        return `${Constants.API_ROOT}/genre/movie/list?api_key=${Constants.API_KEY}&language=en-US`
    }
}