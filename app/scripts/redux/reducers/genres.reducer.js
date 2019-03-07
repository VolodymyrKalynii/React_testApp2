import Consts from '../Constants';
import {GenresState} from '../state';

export function genresReducer(state = GenresState.initialState, action) {
    switch (action.type) {
        case Consts.LOAD_GENRES:
            // console.log(action.payload.genres.genres);
            const genres = action.payload.genres.genres;
            // const genres = [...action.payload.genres];
            return {
                ...state,
                genres,
                isGenresLoaded: action.payload.isGenresLoaded
            };
        default:
            return state
    }
}
