import * as React from 'react';
import connect from 'react-redux/es/connect/connect';

import {starActions} from '../redux/actions';
import MoviesList from '../components/MoviesList';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from '../components/Loader';

class Bookmarks extends React.Component{
    constructor(props) {
        super(props);

        this.starMoviesId = this.props.starMoviesId;

        this.state = {
            allowRenderMovies: false,
            movies: []
        }
    }

    componentDidMount() {
        this.starMoviesId.map((movieId) => {
            this.loadMovieById(movieId);
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.movies.length === this.starMoviesId.length;
    }

    render() {
        const isStaredMovies = this.starMoviesId.length !== 0;

        return isStaredMovies
            ? this.getContent()
            : (<div>No movies</div>)
    }

    getContent = () => {
        return this.state.allowRenderMovies
            ? <MoviesList movies={this.state.movies}/>
            : (<Loader/>)
    };

    /**
     * @param {number} movieId
     */
    loadMovieById = (movieId) => {
        fetch(RequestsURLsCreator.loadMovieById(movieId))
            .then(response => response.json())
            .then(response => {
                const movies = [...this.state.movies];
                movies.push(response);

                this.setState({
                    movies,
                    allowRenderMovies: true
                })
            });
    };
}

const mapStateToProps = store => {
    return {
        starMoviesId: store.starMovies.starMoviesId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addStarAction: starMoviesId => dispatch(starActions.addStar(starMoviesId)),
        removeStarAction: starMoviesId => dispatch(starActions.removeStar(starMoviesId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
