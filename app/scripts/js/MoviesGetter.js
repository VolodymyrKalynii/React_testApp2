import {MovieLoader} from '../lib/data-loader';

export default class MoviesGetter {
    static get(moviesId, saveMovies, dispatch) {

        return (new MoviesGetter(moviesId, saveMovies, dispatch).get())
    }

    constructor(moviesId, saveMovies, dispatch) {
        this.dispatch = dispatch;
        this.moviesId = moviesId;
        this.saveMovies = saveMovies;
        this.starMovies = [];
    }

    get() {
        this.moviesId.map((movieId) => {
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

        if (this.starMovies.length >= this.moviesId.length)
            this.dispatch(this.saveMovies(this.starMovies));
    };
}
