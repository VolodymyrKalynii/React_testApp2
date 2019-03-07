import * as React from 'react';
import {connect} from 'react-redux';

import {movieActions} from '../redux/actions/index';
import Loader from '../components/Loader';
import Movie from '../components/Movie';

class MovieWrapper extends React.Component {
    componentDidMount() {
        const {loadMovie} = this.props;

        loadMovie(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        const {loadMovie} = this.props;

        if (this.isAllowSendRequest(nextProps))
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
            : <Loader/>;
    }

    /**
     * @param {{}} nextProps
     * @return {boolean|*}
     */
    isAllowSendRequest = nextProps => {
        const {movieInfo: {id: currId}} = this.props;
        const {match: {params: {id}}, isMovieLoaded} = nextProps;

        return +id !== currId && currId && !isMovieLoaded;
    };
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
