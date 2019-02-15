import * as React from 'react';
import {NavLink} from 'react-router-dom';
import Constants from '../lib/Constants';
import PageActions from '../redux/actions/page';
import connect from 'react-redux/es/connect/connect';

class FilmLink extends React.Component{
    constructor(props) {
        super(props);

        this.starFilmsId = this.props.starFilmsId;

        this.addStarAction = this.props.addStarAction;
        this.removeStarAction = this.props.removeStarAction;

        this.state = {
            isFilmStared: this.isFilmInStarFilms(),
            filmGenres: []
        }
    }

    render() {
        return (
            <div className='filmLink'>
                <NavLink className='filmLink__link' to={`/movie/${this.props.film.id}`}>
                    <div className='filmLink__topBlock'>
                        <span className='filmLink__title'>{this.props.film.title}</span>
                        {this.renderButton()}
                    </div>
                    <div className='filmLink__imgBlock'>
                        <img className='filmLink__img' src={Constants.IMG_ROOT+this.props.film.poster_path} alt=''/>
                    </div>
                    <p className="filmLink__genres">
                        {this.renderGenres()}
                    </p>
                </NavLink>
            </div>
        );
    }

    renderGenres = () => {

        if (this.props.film.genres) {
            return this.props.film.genres
                .map((genreObj) => genreObj.name)
                .join(', ');
        } else {
            const genresArr = [];
            const {film: {genre_ids}, genres} = this.props;

            genres.map((genreObj) => {
                genre_ids.map((genreId) => {
                    if (genreObj.id === genreId)
                        genresArr.push(genreObj.name);
                })
            });

            return genresArr.join(', ');
        }
    };

    renderButton = () => {
        return this.state.isFilmStared
            ? <button onClick={this.removeFromStarList}>remove star</button>
            : <button onClick={this.addToStarList}>star</button>
    };

    addToStarList = (evt) => {
        evt.preventDefault();
        const {starFilmsId} = this.props;
        const {id} = this.props.film;

        starFilmsId.push(id);
        this.setState({
            isFilmStared: true
        });

        this.addStarAction(starFilmsId)
    };


    removeFromStarList = (evt) => {
        evt.preventDefault();
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
        const {id} = this.props.film;

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
        const {id} = this.props.film;

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

export default connect(mapStateToProps, mapDispatchToProps)(FilmLink)