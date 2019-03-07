import Consts from '../Constants';
import {GenresGetter} from '../../lib/data-getter';

const saveGenres = genres => ({
    type: Consts.LOAD_GENRES,
    payload: {
        genres,
        isGenresLoaded: true
    }
});

const loadGenres = () => dispatch => (
    GenresGetter.get(saveGenres, dispatch)
);

export default {
    loadGenres
}