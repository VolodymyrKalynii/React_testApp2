import * as React from 'react';
import {NavLink} from 'react-router-dom';
import Constants from '../lib/Constants';
import PageActions from '../redux/actions/page';
import connect from 'react-redux/es/connect/connect';

class MovieLink extends React.Component{
    constructor(props) {
        super(props);

        this.starFilmsId = this.props.starFilmsId;

        this.addStarAction = this.props.addStarAction;
        this.removeStarAction = this.props.removeStarAction;

        this.state = {
            isMovieStared: this.isMovieInStarFilms()
        }
    }

    render() {
        return (
            <div className='filmLink'>
                <NavLink className='filmLink__link' to={`/movie/${this.props.movie.id}`}>
                    <div className='filmLink__topBlock'>
                        <span className='filmLink__title'>{this.props.movie.title}</span>
                        {this.renderButton()}
                    </div>
                    <div className='filmLink__imgBlock'>
                        <img className='filmLink__img' src={Constants.IMG_ROOT+this.props.movie.poster_path} alt=''/>
                    </div>
                    <p className="filmLink__genres">
                        {this.renderGenres()}
                    </p>
                </NavLink>
            </div>
        );
    }

    renderButton = () => {
        return this.state.isMovieStared
            ? <button onClick={this.removeFromStarList}>remove star</button>
            : <button onClick={this.addToStarList}>star</button>
    };

    renderGenres = () => {
        const {genres} = this.props.movie;

        return genres
            ? this.getGenresStr(genres)
            : this.getGenresFromProps()
    };

    /**
     *
     * @param {Array<{}>} genres
     * @return {string | *}
     */
    getGenresStr = (genres) => {
        return genres
            .map((genreObj) => genreObj.name)
            .join(', ');
    };

    getGenresFromProps = () => {
        const genresArr = [];
        const {movie: {genre_ids}, genres} = this.props;

        genres.map((genreObj) => {
            genre_ids.map((genreId) => {
                if (genreObj.id === genreId)
                    genresArr.push(genreObj);
            })
        });

        return this.getGenresStr(genresArr);
    };

    addToStarList = (evt) => {
        evt.preventDefault();
        const {movie: {id}, starFilmsId} = this.props;

        starFilmsId.push(id);

        this.setState({
            isMovieStared: true
        });

        this.addStarAction(starFilmsId)
    };


    removeFromStarList = (evt) => {
        evt.preventDefault();
        const {starFilmsId} = this.props;
        const movieIdIndex = this.getMovieIdIndexInStarList();

        starFilmsId.splice(movieIdIndex, 1);
        this.setState({
            isMovieStared: false
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieLink)