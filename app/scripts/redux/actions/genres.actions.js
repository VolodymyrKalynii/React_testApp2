import Consts from '../../lib/Constants';
import {GenresLoader} from '../../lib/data-loader';

const saveGenres = genres => ({
    type: Consts.LOAD_GENRES,
    payload: {
        genres,
        isGenresLoaded: true
    }
});

const loadGenres = () => dispatch => (
    GenresLoader.load()
        .then(response => dispatch(saveGenres(response)))
);

export default {
    loadGenres
}