import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import {movieActions} from '../redux/actions/index';
import Loader from '../components/Loader';
import Movie from '../components/Movie';

class MovieWrapper extends React.Component{
    componentDidMount() {
        const {loadMovie} = this.props;

        loadMovie(this.props.match.params.id)
    }

    componentWillReceiveProps(nextProps) {
        const {movieInfo: {id}, loadMovie} = this.props;

        if (+nextProps.match.params.id !== id && id && !nextProps.isMovieLoaded)
                loadMovie(nextProps.match.params.id);
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isMovieLoaded;
    }

    componentDidUpdate() {
        const {finishLoadMovie, isMovieLoaded} = this.props;

        if (isMovieLoaded)
            finishLoadMovie();
    }

    render() {
        const {isMovieLoaded, movieInfo} = this.props;

        return isMovieLoaded
            ? <Movie movie={movieInfo}/>
            : <Loader/>
    }
}

const mapStateToProps = store => {
    return {
        movieInfo: store.movie.movieInfo,
        isMovieLoaded: store.movie.isMovieLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadMovie: movieId => dispatch(movieActions.loadMovie(movieId)),
        finishLoadMovie: () => dispatch(movieActions.finishLoadMovie()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieWrapper);
