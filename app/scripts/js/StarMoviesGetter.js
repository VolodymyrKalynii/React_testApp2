import {MovieLoader} from '../lib/data-loader';

export default class StarMoviesGetter {
    static get(starMoviesId, saveStarMovies, dispatch) {
        return (new StarMoviesGetter(starMoviesId, saveStarMovies, dispatch).get())
    }

    constructor(starMoviesId, saveStarMovies, dispatch) {
        this.dispatch = dispatch;
        this.starMoviesId = starMoviesId;
        this.saveStarMovies = saveStarMovies;
        this.starMovies = [];
    }

    get() {
        this.starMoviesId.map((movieId) => {
            this.loadStarMovieById(movieId);
        });
    }

    /**
     * @param {number} movieId
     * @private
     */
    loadStarMovieById = (movieId) => {
        MovieLoader.load(movieId)
            .then(response =>
                this.createArray(response)
            );
    };

    /**
     * @param {{}} response
     * @private
     */
    createArray = response => {
        this.starMovies.push(response);

        if (this.starMovies.length >= this.starMoviesId.length)
            this.dispatch(this.saveStarMovies(this.starMovies));
    };
}
