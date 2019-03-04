import {RecommendedMoviesLoader} from '../lib/data-loader/RecommendedMoviesLoader';
import ArrayUtils from '../lib/ArrayUtils';
import {MovieLoader} from '../lib/data-loader';

export default class RecommendedMoviesIdsGetter {
    /**
     * @param {{}} opts
     * @param {Function} saveMovies
     * @param {Function} dispatch
     */
    static get(opts, saveMovies, dispatch) {
        return (new RecommendedMoviesIdsGetter(opts, saveMovies, dispatch).get());
    }

    /**
     * @param {{}} opts
     * @param {Function} saveMovies
     * @param {Function} dispatch
     * @private
     */
    constructor(opts, saveMovies, dispatch) {
        this.dispatch = dispatch;
        this.opts = opts;
        this.recommendedAllMoviesId = [];
        this.recommendedMoviesPagesQty = 1;
        this.recommendedMoviesQty = opts.recommendedMoviesQty;
        this.recommendedMovies = [];
        this.saveMovies = saveMovies;
    }

    get() {
        RecommendedMoviesLoader.load(this.opts.movieId, this.opts.pageNumber)
            .then(response =>
                this.analyzeResponse(response)
            );
    }

    analyzeResponse = response => {
        const recommendedMoviesId = RecommendedMoviesIdsGetter.getMoviesIdList(response.results);

        this.recommendedAllMoviesId = this.recommendedAllMoviesId.concat(recommendedMoviesId);
        this.recommendedMoviesPagesQty++;

        this.checkRecommendedMoviesPagesQty(response);
    };

    /**
     * @param {{}} response
     */
    checkRecommendedMoviesPagesQty = response => {
        const isThisPageNotLast = this.recommendedMoviesPagesQty <= response.total_pages;

        isThisPageNotLast
            ? this.get()
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
            this.recommendedMoviesQty = this.recommendedAllMoviesId.length;
    };

    // checksRecommendedMoviesLength = () => {
    //     const notEnoughMovies = this.recommendedAllMoviesId.length < this.recommendedMoviesQty;
    //
    //     notEnoughMovies ?
    //         this.recommendedMoviesQty = this.recommendedAllMoviesId.length :
    //         null
    // };

    /**
     * @param {Array<number>} recommendedRndMoviesId
     */
    getRndRecommendedMovies = (recommendedRndMoviesId) => {
        recommendedRndMoviesId.map((movieId) => {
            this.loadRecommendedMovieById(movieId);
        });
    };

    /**
     * @param {number} movieId
     */
    loadRecommendedMovieById = (movieId) => {
        MovieLoader.load(movieId)
            .then(response =>
                this.analyzeResponse2(response)
            );
    };

    analyzeResponse2 = response => {
        this.recommendedMovies.push(response);
        // const allowRunAction = this.recommendedMovies.length >= this.recommendedMoviesQty;
        //
        // allowRunAction
        //     ? this.dispatch(this.saveMovies(this.recommendedMovies))
        //     : null;
        if (this.recommendedMovies.length >= this.recommendedMoviesQty)
            this.dispatch(this.saveMovies(this.recommendedMovies))
    };

    //todo доробити рекомендовані фільми через redux

    /**
     * @param movies
     * @return {*}
     * @private
     */
    static getMoviesIdList = movies =>
        movies.map(movie => movie.id);
}