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
     */
    analyzeResponse = response => {
        const recommendedMoviesId = RecommendedMoviesIdsGetter.getMoviesIdList(response.results);

        this.recommendedAllMoviesId = this.recommendedAllMoviesId.concat(recommendedMoviesId);
        this.recommendedMoviesPagesQty++;

        this.checkRecommendedMoviesPagesQty(response);
    };

    /**
     * @param movies
     * @return {*}
     * @private
     */
    static getMoviesIdList = movies =>
        movies.map(movie => movie.id);

    /**
     * @param {{}} response
     * @private
     */
    checkRecommendedMoviesPagesQty = response => {
        const isThisPageNotLast = this.recommendedMoviesPagesQty <= response.total_pages;

        isThisPageNotLast
            ? this.get()
            : this.getRndRecommendedMoviesId();
    };

    /**
     * @private
     */
    getRndRecommendedMoviesId = () => {
        this.checksRecommendedMoviesLength();

        const recommendedRndMoviesId = ArrayUtils.getRndElements({
            arr: this.recommendedAllMoviesId,
            elementsQty: this.recommendedMoviesQty
        });

        this.getRndRecommendedMovies(recommendedRndMoviesId);
    };

    /**
     * @private
     */
    checksRecommendedMoviesLength = () => {
        if (this.recommendedAllMoviesId.length < this.recommendedMoviesQty)
            this.recommendedMoviesQty = this.recommendedAllMoviesId.length;
    };

    /**
     * @param {Array<number>} recommendedRndMoviesId
     * @private
     */
    getRndRecommendedMovies = (recommendedRndMoviesId) => {
        recommendedRndMoviesId.map((movieId) => {
            this.loadRecommendedMovieById(movieId);
        });
    };

    /**
     * @param {number} movieId
     * @private
     */
    loadRecommendedMovieById = (movieId) => {
        MovieLoader.load(movieId)
            .then(response =>
                this.createArray(response)
            );
    };

    /**
     * @param {{}} response
     * @private
     */
    createArray = response => {
        this.recommendedMovies.push(response);

        if (this.recommendedMovies.length >= this.recommendedMoviesQty)
            this.dispatch(this.saveMovies(this.recommendedMovies));
    };
}