import RequestsURLsCreator from '../../js/RequestsURLsCreator';

export class MovieLoader {
    static async load(movieId) {
        const genresUrl = this.getMovieUrl(movieId);

        const response = await fetch(genresUrl);

        return response.json();
    }

    /**
     * @param {number} movieId
     * @return {string}
     * @private
     */
    static getMovieUrl(movieId) {
        return RequestsURLsCreator.loadMovieById(movieId);
    }
}