import * as React from 'react';

import {JsonImporter} from '../lib/JsonImporter';
import ArrayUtils from '../lib/ArrayUtils';
import MoviesList from './MoviesList';
import {AppConfig} from '../global-config';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from './Loader';

export default class RecommendedMovies extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readyRecommendedMovies: false,
            recommendedMovies: [],
            recommendedAllMoviesId: [],
        };

        this.recommendedMoviesPageQty = 1;
        this.recommendedMoviesQty = AppConfig.RECOMMENDED_MOVIES_QTY;
        this.recommendedAllMoviesId = [];
    }

    componentDidMount() {
        this.loadRecommendedMoviesId(this.props.movieId);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            recommendedMovies: []
        });
        this.loadRecommendedMoviesId(nextProps.movieId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.readyRecommendedMovies;
    }

    render() {
        return (
            <div>
                {this.renderSimilarFilms()}
            </div>
        );
    }

    renderSimilarFilms = () => {
        return this.state.readyRecommendedMovies
            ? <MoviesList movies={this.state.recommendedMovies}/>
            : <Loader/>
    };
    
    /**
     * @param {number} movieId
     * @param {number} pageNumber
     */
    loadRecommendedMoviesId = (movieId, pageNumber = 1) => {
        const moviesList = JsonImporter.import(RequestsURLsCreator.loadRecommendedMoviesByIdAndPageNumber(movieId, pageNumber));

        moviesList.then(response => {
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
        // this.recommendedAllMoviesId.splice(0, 40);
        // console.log(this.recommendedAllMoviesId);
        // console.log(this.recommendedMoviesQty);


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
        const movie = JsonImporter.import(RequestsURLsCreator.loadMovieById(movieId));

        movie.then(response => {
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
