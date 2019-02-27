import * as React from 'react';

import Movie from './Movie';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from './Loader';

export default class MovieWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            movieInfo: '',
            loadedFilm: false,
        };
    }

    componentDidMount() {
        this.loadMovieById(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (+nextProps.match.params.id !== this.state.movieInfo.id)
            this.loadMovieById(nextProps.match.params.id);
    }

    render() {
        return this.state.loadedFilm
            ? <Movie movie={this.state.movieInfo}/>
            : <Loader/>
    }

    /**
     * @param {number} movieId
     */
    loadMovieById = (movieId) => {
        fetch(RequestsURLsCreator.loadMovieById(movieId))
            .then(response => response.json())
            .then(response => {
                this.setState({
                    loadedFilm: true,
                    movieInfo: response
                })
            });
    };
}
