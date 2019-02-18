import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PageActions from '../redux/actions/page';

class StarButton extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isMovieStared: this.isMovieInStarFilms()
        };

        this.addStarAction = this.props.addStarAction;
        this.removeStarAction = this.props.removeStarAction;
    }

    render() {
        return this.state.isMovieStared
            ? <button onClick={this.removeFromStarList}>remove star</button>
            : <button onClick={this.addToStarList}>star</button>
    }

    addToStarList = (evt) => {
        evt.preventDefault();
        const {movieId, starMoviesId} = this.props;

        starMoviesId.push(movieId);
        this.setState({
            isMovieStared: true,
        });

        this.addStarAction(starMoviesId);
    };

    removeFromStarList = (evt) => {
        evt.preventDefault();
        const {starMoviesId} = this.props;
        const movieIdIndex = this.getMovieIdIndexInStarList();

        starMoviesId.splice(movieIdIndex, 1);
        this.setState({
            isMovieStared: false,
        });

        this.removeStarAction(starMoviesId);
    };

    getMovieIdIndexInStarList = () => {
        const {movieId, starMoviesId} = this.props;
        let movieIdIndex = null;

        starMoviesId.some((filmId, index) => {
            if (filmId === movieId) {
                movieIdIndex = index;
                return true
            }
        });

        return movieIdIndex;
    };

    isMovieInStarFilms = () => {
        const {movieId, starMoviesId} = this.props;

        return ~starMoviesId.indexOf(movieId);
    };
}

const mapStateToProps = store => ({
    starMoviesId: store.starMoviesId,
});

const mapDispatchToProps = dispatch => ({
    addStarAction: starMoviesId => dispatch(PageActions.addStar(starMoviesId)),
    removeStarAction: starMoviesId => dispatch(PageActions.removeStar(starMoviesId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarButton);

StarButton.propTypes = {
    movieId: PropTypes.number.isRequired,
    starMoviesId: PropTypes.array.isRequired
};