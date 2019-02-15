import * as React from 'react';
import {connect} from 'react-redux';
import PageActions from '../redux/actions/page';

class StarButton extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            isMovieStared: this.isMovieInStarFilms()
        }


        //todo зробити кнопку для добавляння закладок як окремий компоенет
    }

    render() {
        return this.state.isMovieStared
            ? <button onClick={this.removeFromStarList}>remove star</button>
            : <button onClick={this.addToStarList}>star</button>
    }

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

export default connect(mapStateToProps, mapDispatchToProps)(StarButton);