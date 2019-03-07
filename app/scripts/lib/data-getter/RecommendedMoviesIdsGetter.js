import {RecommendedMoviesLoader} from '../data-loader/RecommendedMoviesLoader';
import ArrayUtils from '../ArrayUtils';

export class RecommendedMoviesIdsGetter {
    /**
     * @param {{}} opts
     * @param {Function} loadMovies
     * @param {Function} setEmptyRecommendedList
     * @param {Function} dispatch
     */
    static get(opts, loadMovies, setEmptyRecommendedList, dispatch) {
        return (new RecommendedMoviesIdsGetter(opts, loadMovies, setEmptyRecommendedList, dispatch).get());
    }

    /**
     * @param {{}} opts
     * @param {Function} loadMovies
     * @param {Function} setEmptyRecommendedList
     * @param {Function} dispatch
     * @private
     */
    constructor(opts, loadMovies, setEmptyRecommendedList, dispatch) {
        this.opts = opts;
        this.recommendedAllMoviesId = [];
        this.recommendedMoviesPagesQty = 1;
        this.recommendedMoviesQty = opts.recommendedMoviesQty;
        this.recommendedMovies = [];
        this.loadMovies = loadMovies;
        this.dispatch = dispatch;
        this.setEmptyRecommendedList = setEmptyRecommendedList;
    }

    /**
     * @private
     */
    get() {
        RecommendedMoviesLoader.load(this.opts.movieId, this.opts.pageNumber)
            .then(response =>
                this.analyzeResponse(response)
            );
    }

    /**
     * @param {{}} response
     * @private
     */
    analyzeResponse(response) {
        const recommendedMoviesId = RecommendedMoviesIdsGetter.getMoviesIdList(response.results);

        this.checkRecommendedMoviesIdLength(response, recommendedMoviesId);
    };

    /**
     * @param {Array<{}>} movies
     * @return {*}
     * @private
     */
    static getMoviesIdList = movies =>
        movies.map(movie => movie.id);

    /**
     * @param {{}} response
     * @param {Array<number>} recommendedMoviesId
     */
    checkRecommendedMoviesIdLength(response, recommendedMoviesId) {
        const isEmptyArray = recommendedMoviesId.length === 0;

        isEmptyArray ?
            this.dispatch(this.setEmptyRecommendedList()) :
            this.continueWorkWithMovies(response, recommendedMoviesId);
    };

    continueWorkWithMovies(response, recommendedMoviesId) {
        this.recommendedAllMoviesId = this.recommendedAllMoviesId.concat(recommendedMoviesId);
        this.recommendedMoviesPagesQty++;

        this.checkRecommendedMoviesPagesQty(response);
    }

    /**
     * @param {{}} response
     * @private
     */
    checkRecommendedMoviesPagesQty(response) {
        const isThisPageNotLast = this.recommendedMoviesPagesQty <= response.total_pages;

        isThisPageNotLast
            ? this.get()
            : this.getRndRecommendedMoviesId();
    };

    /**
     * @private
     */
    getRndRecommendedMoviesId() {
        this.checksRecommendedMoviesLength();

        const recommendedRndMoviesId = ArrayUtils.getRndElements({
            arr: this.recommendedAllMoviesId,
            elementsQty: this.recommendedMoviesQty
        });

        this.dispatch(this.loadMovies(recommendedRndMoviesId));
    };

    /**
     * @private
     */
    checksRecommendedMoviesLength() {
        if (this.recommendedAllMoviesId.length < this.recommendedMoviesQty)
            this.recommendedMoviesQty = this.recommendedAllMoviesId.length;
    };
}
