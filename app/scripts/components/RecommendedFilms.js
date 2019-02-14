import * as React from 'react';
import {JsonImporter} from '../lib/JsonImporter';
import Constants from '../lib/Constants';
import ArrayUtils from '../lib/ArrayUtils';
import FilmsList from './FilmsList';

export default class RecommendedFilms extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            readySimilarFilms: false,
            recommendedFilms: [],
            recommendedFilmsId: [],
        };

        this.recommendedFilmsPagesQty = 1;
    }

    componentDidMount() {
        this.sendRequest(this.props.filmId);
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.readySimilarFilms;
    }

    render() {
        return (
            <div>
                {this.renderSimilarFilms()}
            </div>
        );
    }

    renderSimilarFilms = () => {
        // console.log(this.state.recommendedFilms);
        if (this.state.readySimilarFilms) {
            return (
                <div>
                    <FilmsList films={this.state.recommendedFilms}/>
                </div>
            )
        }
        else {
            return (
                <div>loading</div>
            )
        }
    };


    /**
     * @param {number} movieId
     * @param {number} pageNumber
     */
    sendRequest = (movieId, pageNumber = 1) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/${movieId}/recommendations?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`);
        filmsList.then(response => {
            const recommendedFilmsIdNew = this.getFilmsIdList(response.results);
            const recommendedFilmsId = this.state.recommendedFilmsId.concat(recommendedFilmsIdNew);

            this.recommendedFilmsPagesQty++;

            this.setState({recommendedFilmsId});

            this.checkRecommendedFilmsPagesQty(movieId, response)
        });
    };

    getFilmsIdList(films) {
        return films.map((film) => film.id)
    }

    checkRecommendedFilmsPagesQty = (movieId, response) => {
        const isThisPageNotLast = this.recommendedFilmsPagesQty <= response.total_pages;

        isThisPageNotLast
            ? this.sendRequest(movieId, this.recommendedFilmsPagesQty)
            : this.getRndRecommendedFilmsId();
    };


    getRndRecommendedFilmsId = () => {
        const recommendedFilms = this.state.recommendedFilmsId;
        const recommendedFilmsIdMixed = ArrayUtils.mixElems(recommendedFilms);
        const recommendedFilmsIdMixedSliced = recommendedFilmsIdMixed.slice(recommendedFilmsIdMixed.length - 3);

        this.getRndRecommendedFilms(recommendedFilmsIdMixedSliced);
    };

    getRndRecommendedFilms = (recommendedFilmsIdMixedSliced) => {
        recommendedFilmsIdMixedSliced.map((filmId) => {
            this.sendRequest2(filmId, recommendedFilmsIdMixedSliced);
        })
    };


    /**
     * @param {number} movieId
     * @param {Array<number>} recommendedFilmsIdMixedSliced
     */
    sendRequest2 = (movieId, recommendedFilmsIdMixedSliced) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`);
        filmsList.then(response => {
            const recommendedFilms = [...this.state.recommendedFilms];
            recommendedFilms.push(response);

            this.setState({
                recommendedFilms
            });

            if (recommendedFilms.length === recommendedFilmsIdMixedSliced.length) {
                this.setState({
                    readySimilarFilms: true
                });
            }
        });
    };

}