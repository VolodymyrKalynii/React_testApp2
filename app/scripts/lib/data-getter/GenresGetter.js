import {GenresLoader} from '../data-loader';

export class GenresGetter {
    static get(saveGenres, dispatch) {
        return (new GenresGetter(saveGenres, dispatch).get())
    }

    constructor(saveGenres, dispatch) {
        this.saveGenres = saveGenres;
        this.dispatch = dispatch;
    }

    get() {
        GenresLoader.load()
            .then(response => this.dispatch(this.saveGenres(response)))
    }
}