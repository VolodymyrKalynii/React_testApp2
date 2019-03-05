import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {starActions} from '../redux/actions';

class StarButton extends React.Component{
    // state = {
    //     isMovieStared: isMovieInStarList(this.props)
    // }
    constructor(props) {
        super(props);

        this.state = {
            isMovieStared: this.isMovieInStarList(this.props)
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isMovieStared: this.isMovieInStarList(nextProps)
        })
    }

    render() {
        return (
            <div onClick={this.getHandler()}>
                <svg className={`starButton ${this.getClassName()}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.94 47.94">
                    <path d="M26.285 2.486l5.407 10.956c.376.762 1.103 1.29 1.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528c-.608.593-.886 1.448-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685c-.752-.395-1.651-.395-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042c.144-.837-.134-1.692-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757c.841-.122 1.568-.65 1.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z" fill="#ed8a19"/>
                </svg>
            </div>
        )
    }

    getHandler = () => {
        return this.state.isMovieStared
            ? this.removeFromStarList
            : this.addToStarList
    };

    getClassName = () => {
        return this.state.isMovieStared
            ? 'starButton-starred'
            : ''
    };

    addToStarList = (evt) => {
        evt.preventDefault();
        const {movieId, starMoviesId, addStarAction} = this.props;

        starMoviesId.push(movieId);

        this.setState({
            isMovieStared: true,
        });

        addStarAction(starMoviesId);
    };

    removeFromStarList = (evt) => {
        evt.preventDefault();
        const {starMoviesId, removeStarAction} = this.props;
        const movieIdIndex = this.getMovieIdIndexInStarList();

        starMoviesId.splice(movieIdIndex, 1);
        this.setState({
            isMovieStared: false,
        });

        removeStarAction(starMoviesId);
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

    isMovieInStarList = (props) => {
        const {movieId, starMoviesId} = props;

        return !!~starMoviesId.indexOf(movieId);
    };
}

const mapStateToProps = store => ({
    starMoviesId: store.starMovies.starMoviesId,
});

const mapDispatchToProps = dispatch => ({
    addStarAction: starMoviesId => dispatch(starActions.addStar(starMoviesId)),
    removeStarAction: starMoviesId => dispatch(starActions.removeStar(starMoviesId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StarButton);

StarButton.propTypes = {
    movieId: PropTypes.number.isRequired,
    starMoviesId: PropTypes.array.isRequired
};