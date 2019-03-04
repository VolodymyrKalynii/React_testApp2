import Consts from '../../lib/Constants';

const initialState = {
    movies: [],
    recommendedMoviesPagesQty: 0
};

export function recommendedMoviesReducer(state = initialState, action) {

    switch (action.type) {
        case Consts.LOAD_RECOMMENDED_MOVIES_PAGES_QTY:
            // console.log(action.payload);
            return {
                ...state,
                recommendedMoviesPagesQty: action.payload
            };
        case Consts.LOAD_RECOMMENDED_MOVIES_ID:
            console.log(action.payload);

            return {
                ...state
            };
        default:
            return state
    }
}
