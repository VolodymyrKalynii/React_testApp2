import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import {recommendedMoviesActions} from '../redux/actions/index';
import Loader from '../components/Loader';
import MoviesList from '../components/MoviesList';
import {AppConfig} from '../global-config/index';

class RecommendedMovies extends React.Component {
    componentDidMount() {
        this.startLoadMovies(this.props)
    }

    componentWillReceiveProps(nextProps) {
        const {movieId} = this.props;

        if (+nextProps.movieId !== movieId)
            this.startLoadMovies(nextProps)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.isRecommendedMoviesLoaded;
    }

    componentDidUpdate() {
        const {finishLoadMovies, isRecommendedMoviesLoaded} = this.props;

        if (isRecommendedMoviesLoaded)
            finishLoadMovies();
    }

    render() {
        const {isRecommendedMoviesLoaded} = this.props;

        return isRecommendedMoviesLoaded
            ? <MoviesList movies={this.props.movies}/>
            : <Loader/>;
    }

    startLoadMovies = props => {
        const {loadRecommendedMovies} = this.props;
        const recommendedMoviesQty = AppConfig.RECOMMENDED_MOVIES_QTY;

        loadRecommendedMovies({
            movieId: props.movieId,
            pageNumber:1,
            recommendedMoviesPagesQty:1,
            recommendedMoviesQty: recommendedMoviesQty
        });
    }
}


const mapStateToProps = store => {
    return {
        movies: store.recommendedMovies.movies,
        isRecommendedMoviesLoaded: store.recommendedMovies.isRecommendedMoviesLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        finishLoadMovies: () => dispatch(recommendedMoviesActions.finishLoadMovies()),
        loadRecommendedMovies: (opts) => dispatch(recommendedMoviesActions.loadRecommendedMovies(opts)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedMovies);