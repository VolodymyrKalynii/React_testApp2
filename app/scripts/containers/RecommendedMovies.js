import * as React from 'react';
import {connect} from 'react-redux';

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
        const {
            finishLoadMovies,
            isRecommendedMoviesLoaded,
            setNotEmptyRecommendedList
        } = this.props;

        if (isRecommendedMoviesLoaded) {
            finishLoadMovies();
            setNotEmptyRecommendedList()
        }
    }

    render() {
        const {isRecommendedMoviesLoaded, isNoRecommendedMovies} = this.props;

        return isRecommendedMoviesLoaded
            ? isNoRecommendedMovies
                ? <div>No movies</div>
                : <MoviesList movies={this.props.movies}/>
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
        isNoRecommendedMovies: store.recommendedMovies.isNoRecommendedMovies,
        isRecommendedMoviesLoaded: store.recommendedMovies.isRecommendedMoviesLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setNotEmptyRecommendedList: () => dispatch(recommendedMoviesActions.setNotEmptyRecommendedList()),
        finishLoadMovies: () => dispatch(recommendedMoviesActions.finishLoadMovies()),
        loadRecommendedMovies: (opts) => dispatch(recommendedMoviesActions.loadRecommendedMovies(opts)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedMovies);