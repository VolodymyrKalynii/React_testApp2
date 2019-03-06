import {RecommendedMoviesLoader} from '../data-loader/RecommendedMoviesLoader';
import ArrayUtils from '../ArrayUtils';

export class RecommendedMoviesIdsGetter {
    /**
     * @param {{}} opts
     * @param {Function} loadMovies
     * @param {Function} saveMovies12
     * @param {Function} dispatch
     */
    static get(opts, loadMovies, saveMovies12, dispatch) {
        return (new RecommendedMoviesIdsGetter(opts, loadMovies, saveMovies12, dispatch).get());
    }

    /**
     * @param {{}} opts
     * @param {Function} loadMovies
     * @param {Function} saveMovies12
     * @param {Function} dispatch
     * @private
     */
    constructor(opts, loadMovies, saveMovies12, dispatch) {
        this.opts = opts;
        this.recommendedAllMoviesId = [];
        this.recommendedMoviesPagesQty = 1;
        this.recommendedMoviesQty = opts.recommendedMoviesQty;
        this.recommendedMovies = [];
        this.loadMovies = loadMovies;
        this.dispatch = dispatch;
        this.saveMovies12 = saveMovies12;
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
    analyzeResponse = response => {
        const recommendedMoviesId = RecommendedMoviesIdsGetter.getMoviesIdList(response.results);
        console.log(recommendedMoviesId);

        this.checkRecommendedMoviesIdLength(recommendedMoviesId);

        this.recommendedAllMoviesId = this.recommendedAllMoviesId.concat(recommendedMoviesId);
        this.recommendedMoviesPagesQty++;

        this.checkRecommendedMoviesPagesQty(response);
    };

    /**
     * @param {Array<{}>} movies
     * @return {*}
     * @private
     */
    static getMoviesIdList = movies =>
        movies.map(movie => movie.id);

    checkRecommendedMoviesIdLength = (recommendedMoviesId) => {
        if (recommendedMoviesId.length === 0)
            this.dispatch(this.saveMovies12())
    };

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

        this.dispatch(this.loadMovies(recommendedRndMoviesId));
    };

    /**
     * @private
     */
    checksRecommendedMoviesLength = () => {
        if (this.recommendedAllMoviesId.length < this.recommendedMoviesQty)
            this.recommendedMoviesQty = this.recommendedAllMoviesId.length;
    };
}
