import * as React from 'react';
import PageActions from '../redux/actions/page';
import connect from 'react-redux/es/connect/connect';
import {JsonImporter} from '../lib/JsonImporter';
import MoviesList from '../components/MoviesList';
import RequestsURLsCreator from '../js/RequestsURLsCreator';

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
            : (<div>loading..</div>)
    };

    /**
     * @param {number} movieId
     */
    loadMovieById = (movieId) => {
        const movie = JsonImporter.import(RequestsURLsCreator.loadMovieById(movieId));

        movie.then(response => {
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
        starMoviesId: store.starMoviesId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        addStarAction: starMoviesId => dispatch(PageActions.addStar(starMoviesId)),
        removeStarAction: starMoviesId => dispatch(PageActions.removeStar(starMoviesId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
