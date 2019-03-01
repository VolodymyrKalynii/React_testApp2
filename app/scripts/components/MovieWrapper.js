import * as React from 'react';

import Movie from './Movie';
import Loader from './Loader';
import {movieActions} from '../redux/actions';
import connect from 'react-redux/es/connect/connect';

class MovieWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.counter = 0;
    }


    componentDidMount() {
        const {loadMovie} = this.props;

        loadMovie(this.props.match.params.id)
    }

    // componentWillReceiveProps(nextProps) {
    //     const {movieInfo: {id}, loadMovie} = this.props;
    //     // console.log(id);
    //     // console.log(+nextProps.match.params.id);
    //     this.counter++;
    //     console.log(this.counter);
    //     // console.log(+nextProps.match.params.id !== id);
    //
    //     // console.log('ReceiveProps');
    //
    //     if (+nextProps.match.params.id !== id && this.counter > 1) {
    //         console.log('new film');
    //         loadMovie(nextProps.match.params.id);
    //         this.counter = 0;
    //     }
    // }

    shouldComponentUpdate(nextProps) {
        const {movieInfo: {id}, loadMovie} = this.props;
        // console.log(id);
        // console.log(+nextProps.match.params.id);
        this.counter++;
        console.log(this.counter);
        // console.log(+nextProps.match.params.id !== id);

        // console.log('ReceiveProps');

        if (+nextProps.match.params.id !== id && this.counter > 1) {
            console.log('new film');
            loadMovie(nextProps.match.params.id);
            this.counter = 0;
            return true
        } return false
    }

    render() {
        const {isMovieLoaded, movieInfo} = this.props;

        console.log('render');
        return isMovieLoaded
            ? <Movie movie={movieInfo}/>
            : <Loader/>
    }

    // /**
    //  * @param {number} movieId
    //  */
    // loadMovieById = (movieId) => {
    //     fetch(RequestsURLsCreator.loadMovieById(movieId))
    //         .then(response => response.json())
    //         .then(response => {
    //             this.setState({
    //                 loadedFilm: true,
    //                 movieInfo: response
    //             })
    //         });
    // };
}

const mapStateToProps = store => {
    return {
        movieInfo: store.movie.movieInfo,
        isMovieLoaded: store.movie.isMovieLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMovie: movieId => dispatch(movieActions.loadMovie(movieId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieWrapper);
