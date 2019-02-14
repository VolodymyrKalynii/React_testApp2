import * as React from 'react';
import PageActions from '../redux/actions/page';
import connect from 'react-redux/es/connect/connect';
import {JsonImporter} from '../lib/JsonImporter';
import Constants from '../lib/Constants';
import FilmsList from './FilmsList';

class Bookmarks extends React.Component{
    constructor(props) {
        super(props);

        this.starFilmsId = this.props.starFilmsId;

        this.state = {
            renderFilms: false,
            films: []
        }
    }

    componentDidMount() {
        this.starFilmsId.map((filmId) => {
            this.sendRequest(filmId);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.films.length === this.starFilmsId.length;
    }

    render() {
        if (this.starFilmsId.length === 0)
            return (
                <div>
                    no films
                </div>
            );
        else {
            if (this.state.renderFilms) {
                console.log('рендер ', this.state.films);
                return (
                    <div>
                        <FilmsList films={this.state.films}/>
                    </div>
                )
            } else {
                return (
                    <div>
                        loading
                    </div>
                )
            }
        }

    }

    /**
     * @param {number} movieId
     */
    sendRequest = (movieId) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`);

        filmsList.then(response => {
            const films = [...this.state.films];
            films.push(response);

            this.setState({
                films,
                renderFilms: true
            })
        });
    };
}


const mapStateToProps = store => {
    return {
        starFilmsId: store.starFilmsId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addStarAction: starFilmsId => dispatch(PageActions.addStar(starFilmsId)),
        removeStarAction: starFilmsId => dispatch(PageActions.removeStar(starFilmsId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)