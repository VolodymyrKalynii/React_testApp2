import RequestsURLsCreator from '../../js/RequestsURLsCreator';

export class MoviesLoader {
    static async loadByPage(pageNumber) {
        const moviesUrl = this.getMoviesUrl(pageNumber);

        const response = await fetch(moviesUrl);

        return response.json();
    }

    static async loadByPageAndName(pageNumber, searchMovieName) {
        const moviesUrl = this.getMoviesUrl2(pageNumber, searchMovieName);

        const response = await fetch(moviesUrl);

        return response.json();
    }

    /**
     * @param {number} pageNumber
     * @param {string} searchMovieName
     * @return {string}
     * @private
     */
    static getMoviesUrl2(pageNumber, searchMovieName) {
        return RequestsURLsCreator.loadPopularMoviesByNameAndPageNumber(pageNumber, searchMovieName);
    }

    /**
     * @param {number} pageNumber
     * @return {string}
     * @private
     */
    static getMoviesUrl(pageNumber) {
        return RequestsURLsCreator.loadPopularMoviesByPageNumber(pageNumber);
    }
}