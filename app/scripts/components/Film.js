import * as React from 'react';
import {connect} from 'react-redux';

import Constants from '../lib/Constants';
import PageActions from '../redux/actions/page';
import RecommendedFilms from './RecommendedFilms';

class Film extends React.Component{
    constructor(props) {
        super(props);

        this.starFilmsId = this.props.starFilmsId;

        this.addStarAction = this.props.addStarAction;
        this.removeStarAction = this.props.removeStarAction;

        this.state = {
            isFilmStared: this.isFilmInStarFilms(),
            readySimilarFilms: false
        };
    }

    render() {
        return (
            <div>
                <h3>{this.props.filmInfo.title}</h3>
                <h4>{this.props.filmInfo.tagline}</h4>
                <h4>{this.props.filmInfo.budget}</h4>
                <h4>{this.renderGenres()}</h4>
                <h4>{this.props.filmInfo.homepage}</h4>
                <h4>{this.props.filmInfo.runtime} minutes</h4>
                <h4>{this.props.filmInfo.release_date}</h4>
                <h4>{this.props.filmInfo.vote_average}</h4>
                <h4>{this.props.filmInfo.vote_count}</h4>
                <p>{this.props.filmInfo.overview}</p>
                <img src={Constants.IMG_ROOT+this.props.filmInfo.poster_path} alt=''/>

                {this.renderButton()}

                <RecommendedFilms filmId={this.props.filmInfo.id}/>
            </div>
        );
    }

    renderGenres = () => {
        const {genres} = this.props.filmInfo;

        return genres
            .map((genreObj) => genreObj.name)
            .join(', ');
    };

    renderButton = () => {
        return this.state.isFilmStared
            ? <button onClick={this.removeFromStarList}>remove star</button>
            : <button onClick={this.addToStarList}>star</button>
    };

    addToStarList = () => {
        const {starFilmsId} = this.props;
        const {id} = this.props.filmInfo;

        starFilmsId.push(id);
        this.setState({
            isFilmStared: true
        });

        this.addStarAction(starFilmsId)
    };

    removeFromStarList = () => {
        const {starFilmsId} = this.props;
        const currentFilmIdIndex = this.getFilmPosInStarList();

        starFilmsId.splice(currentFilmIdIndex, 1);
        this.setState({
            isFilmStared: false
        });

        this.removeStarAction(starFilmsId);
    };

    getFilmPosInStarList = () => {
        let currentFilmIdIndex = null;
        const {starFilmsId} = this.props;
        const {id} = this.props.filmInfo;

        starFilmsId.map((filmId, index) => {
           if (filmId === id) {
               currentFilmIdIndex = index;
               return null
           }
        });

        return currentFilmIdIndex
    };

    isFilmInStarFilms = () => {
        const {starFilmsId} = this.props;
        const {id} = this.props.filmInfo;

        return ~starFilmsId.indexOf(id);
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

export default connect(mapStateToProps, mapDispatchToProps)(Film)