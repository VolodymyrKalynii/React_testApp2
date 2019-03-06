import {MovieLoader} from '../data-loader/index';

export class MovieGetter {
    static get(movieId, saveMovie, dispatch) {

        return (new MovieGetter(movieId, saveMovie, dispatch).get());
    }

    constructor(movieId, saveMovie, dispatch) {
        this.dispatch = dispatch;
        this.movieId = movieId;
        this.saveMovie = saveMovie;
    }

    get() {
        MovieLoader.load(this.movieId)
            .then(response =>
                this.dispatch(this.saveMovie(response))
            );
    }
}
