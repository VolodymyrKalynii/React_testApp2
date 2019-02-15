import * as React from 'react';
import {connect} from 'react-redux';

import Constants from '../lib/Constants';
import PageActions from '../redux/actions/page';
import RecommendedFilms from '../components/RecommendedFilms';

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.starFilmsId = this.props.starFilmsId;

        this.addStarAction = this.props.addStarAction;
        this.removeStarAction = this.props.removeStarAction;

        this.state = {
            isMovieStared: this.isMovieInStarFilms()
        };
    }

    render() {
        return (
            <div>
                <h3>{this.props.movie.title}</h3>
                <h4>{this.props.movie.tagline}</h4>
                <h4>{this.props.movie.budget}</h4>
                <h4>{this.renderGenres()}</h4>
                <h4>{this.props.movie.homepage}</h4>
                <h4>{this.props.movie.runtime} minutes</h4>
                <h4>{this.props.movie.release_date}</h4>
                <h4>{this.props.movie.vote_average}</h4>
                <h4>{this.props.movie.vote_count}</h4>
                <p>{this.props.movie.overview}</p>
                <img src={Constants.IMG_ROOT + this.props.movie.poster_path} alt=""/>

                {this.renderButton()}

                <RecommendedFilms filmId={this.props.movie.id}/>
            </div>
        );
    }

    renderGenres = () => {
        const {genres} = this.props.movie;

        return genres
            .map(genreObj => genreObj.name)
            .join(', ');
    };

    renderButton = () => {
        return this.state.isMovieStared
            ? <button onClick={this.removeFromStarList}>remove star</button>
            : <button onClick={this.addToStarList}>star</button>
    };

    addToStarList = () => {
        const {movie: {id}, starFilmsId} = this.props;

        starFilmsId.push(id);
        this.setState({
            isMovieStared: true,
        });

        this.addStarAction(starFilmsId);
    };

    removeFromStarList = () => {
        const {starFilmsId} = this.props;
        const movieIdIndex = this.getMovieIdIndexInStarList();

        starFilmsId.splice(movieIdIndex, 1);
        this.setState({
            isMovieStared: false,
        });

        this.removeStarAction(starFilmsId);
    };

    getMovieIdIndexInStarList = () => {
        const {movie: {id}, starFilmsId} = this.props;
        let movieIdIndex = null;

        starFilmsId.some((filmId, index) => {
            if (filmId === id) {
                movieIdIndex = index;
                return true
            }
        });

        return movieIdIndex;
    };

    isMovieInStarFilms = () => {
        const {movie: {id}, starFilmsId} = this.props;

        return ~starFilmsId.indexOf(id);
    };
}

const mapStateToProps = store => ({
    starFilmsId: store.starFilmsId,
});

const mapDispatchToProps = dispatch => ({
    addStarAction: starFilmsId => dispatch(PageActions.addStar(starFilmsId)),
    removeStarAction: starFilmsId => dispatch(PageActions.removeStar(starFilmsId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
