import RequestsURLsCreator from '../../js/RequestsURLsCreator';

export class RecommendedMoviesLoader {
    /**
     *
     * @param movieId
     * @param pageNumber
     * @return {Promise<any>}
     */
    static async load(movieId, pageNumber) {

        const moviesUrl = this.getMoviesUrl(movieId, pageNumber);

        const response = await fetch(moviesUrl);

        return response.json();
    }

    // static async load2(pageNumber, searchMovieName) {
    //     const moviesUrl = this.getMoviesUrl2(pageNumber, searchMovieName);
    //
    //     const response = await fetch(moviesUrl);
    //
    //     return response.json();
    // }

    /**
     * @param {number} movieId
     * @param {string} pageNumber
     * @return {string}
     * @private
     */
    static getMoviesUrl(movieId, pageNumber) {
        return RequestsURLsCreator.loadRecommendedMoviesByIdAndPageNumber(movieId, pageNumber);
    }

    /**
     * @param {number} pageNumber
     * @return {string}
     * @private
     */
    // static getMoviesUrl(pageNumber) {
    //     return RequestsURLsCreator.loadPopularMoviesByPageNumber(pageNumber);
    // }
}