import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import PageActions from '../redux/actions/page.actions';

class StarButton extends React.Component{
    constructor(props) {
        super(props);
        const {movieId, starMoviesId} = props;

        this.state = {
            isMovieStared: this.isMovieInStarFilms(movieId, starMoviesId)
        };

        this.addStarAction = this.props.addStarAction;
        this.removeStarAction = this.props.removeStarAction;
    }

    componentWillReceiveProps(nextProps) {
        const {movieId, starMoviesId} = nextProps;


        this.setState({
            isMovieStared: this.isMovieInStarFilms(movieId, starMoviesId)
        })
    }

    render() {
        let handler = null;
        let starClass = '';

        if (this.state.isMovieStared) {
            handler = this.removeFromStarList;
            starClass = 'starButton-starred';
        } else {
            handler = this.addToStarList;
        }

        return (
            <div onClick={handler}>
                <svg className={`starButton ${starClass}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 47.94 47.94">
                    <path d="M26.285 2.486l5.407 10.956c.376.762 1.103 1.29 1.944 1.412l12.091 1.757c2.118.308 2.963 2.91 1.431 4.403l-8.749 8.528c-.608.593-.886 1.448-.742 2.285l2.065 12.042c.362 2.109-1.852 3.717-3.746 2.722l-10.814-5.685c-.752-.395-1.651-.395-2.403 0l-10.814 5.685c-1.894.996-4.108-.613-3.746-2.722l2.065-12.042c.144-.837-.134-1.692-.742-2.285L.783 21.014c-1.532-1.494-.687-4.096 1.431-4.403l12.091-1.757c.841-.122 1.568-.65 1.944-1.412l5.407-10.956c.946-1.919 3.682-1.919 4.629 0z" fill="#ed8a19"/>
                </svg>
            </div>
        )
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

    isMovieInStarFilms = (movieId, starMoviesId) => {
        return !!~starMoviesId.indexOf(movieId);
    };
}

const mapStateToProps = store => ({
    starMoviesId: store.movies.starMoviesId,
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