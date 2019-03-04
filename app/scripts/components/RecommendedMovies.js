import * as React from 'react';

import ArrayUtils from '../lib/ArrayUtils';
import MoviesList from './MoviesList';
import {AppConfig} from '../global-config';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from './Loader';
import {recommendedMoviesActions} from '../redux/actions';
import connect from 'react-redux/es/connect/connect';

class RecommendedMovies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readyRecommendedMovies: false,
            recommendedMovies: [],
            recommendedAllMoviesId: [],
        };

        this.recommendedMoviesQty = AppConfig.RECOMMENDED_MOVIES_QTY;
        this.recommendedAllMoviesId = [];
    }

    componentDidMount() {
        const {loadRecommendedMoviesPagesQty} = this.props;
        // console.log(recommendedMoviesPagesQty);

        loadRecommendedMoviesPagesQty({
            movieId:this.props.movieId,
            pageNumber:1,
            recommendedMoviesPagesQty:1,
            recommendedMoviesQty: this.recommendedMoviesQty
        });
        // this.loadRecommendedMoviesId(this.props.movieId);
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps.recommendedMoviesPagesQty);
        // this.setState({
        //     recommendedMovies: []
        // });
        // this.loadRecommendedMoviesId(nextProps.movieId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.readyRecommendedMovies;
    }

    render() {
        // console.log('render');
        return (
            <div>
                {this.renderSimilarMovies()}
            </div>
        );
    }

    renderSimilarMovies = () => {
        return this.state.readyRecommendedMovies
            ? <MoviesList movies={this.state.recommendedMovies}/>
            : <Loader/>
    };
    
    /**
     * @param {number} movieId
     * @param {number} pageNumber
     */
    loadRecommendedMoviesId = (movieId, pageNumber = 1) => {
        fetch(RequestsURLsCreator.loadRecommendedMoviesByIdAndPageNumber(movieId, pageNumber))
            .then(response => response.json())
            .then(response => {
                const recommendedMoviesId = RecommendedMovies.getMoviesIdList(response.results);
                this.recommendedAllMoviesId = this.recommendedAllMoviesId.concat(recommendedMoviesId);

                this.recommendedMoviesPageQty++;

                this.checkRecommendedMoviesPagesQty(movieId, response)
            });
    };

    /**
     * @param {Array<{}>} movies
     * @return {*}
     */
    static getMoviesIdList(movies) {
        return movies.map((movie) => movie.id)
    }

    /**
     * @param {number} movieId
     * @param {{}} response
     */
    checkRecommendedMoviesPagesQty = (movieId, response) => {
        const isThisPageNotLast = this.recommendedMoviesPageQty <= response.total_pages;

        isThisPageNotLast
            ? this.loadRecommendedMoviesId(movieId, this.recommendedMoviesPageQty)
            : this.getRndRecommendedMoviesId();
    };

    getRndRecommendedMoviesId = () => {
        this.checksRecommendedMoviesLength();

        const recommendedRndMoviesId = ArrayUtils.getRndElements({
            arr: this.recommendedAllMoviesId,
            elementsQty: this.recommendedMoviesQty
        });

        this.getRndRecommendedMovies(recommendedRndMoviesId);
    };

    checksRecommendedMoviesLength = () => {
        if (this.recommendedAllMoviesId.length < this.recommendedMoviesQty)
            this.recommendedMoviesQty = this.recommendedAllMoviesId.length
    };

    /**
     * @param {Array<number>} recommendedRndMoviesId
     */
    getRndRecommendedMovies = (recommendedRndMoviesId) => {
        recommendedRndMoviesId.map((movieId) => {
            this.loadRecommendedMovieById(movieId);
        })
    };

    /**
     * @param {number} movieId
     */
    loadRecommendedMovieById = (movieId) => {
        fetch(RequestsURLsCreator.loadMovieById(movieId))
            .then(response => response.json())
            .then(response => {
                const recommendedMovies = [...this.state.recommendedMovies];
                recommendedMovies.push(response);

                this.setState({
                    recommendedMovies
                });

                if (recommendedMovies.length >= this.recommendedMoviesQty) {
                    this.setState({
                        readyRecommendedMovies: true
                    });
                }
            });
    };
}


const mapStateToProps = store => {
    return {
        movies: store.recommendedMovies.movies,
        recommendedMoviesPagesQty: store.recommendedMovies.recommendedMoviesPagesQty
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadRecommendedMoviesPagesQty: (opts) => dispatch(recommendedMoviesActions.loadRecommendedMoviesPagesQty(opts))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RecommendedMovies);