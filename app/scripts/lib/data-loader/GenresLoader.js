import RequestsURLsCreator from '../../js/RequestsURLsCreator';

export class GenresLoader {
    static async load() {
        const genresUrl = this.getGenresUrl();

        const response = await fetch(genresUrl);

        return response.json();
    }

    /**
     * @return {string}
     * @private
     */
    static getGenresUrl() {
        return RequestsURLsCreator.loadGenres();
    }
}