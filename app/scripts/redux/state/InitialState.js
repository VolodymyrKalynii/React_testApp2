export default class InitialState {}

InitialState.initialState = {
    starFilmsId: JSON.parse(localStorage.getItem('starFilmsId')) || [],
    genres: []
};