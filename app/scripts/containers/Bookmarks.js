import * as React from 'react';
import {connect} from 'react-redux';

import {bookmarksActions} from '../redux/actions';
import MoviesList from '../components/MoviesList';
import Loader from '../components/Loader';

class Bookmarks extends React.Component{
    componentDidMount() {
        const {loadStarMovies, starMoviesId} = this.props;

        loadStarMovies(starMoviesId);
    }

    render() {
        const {starMoviesId} = this.props;
        const isStarMovies = starMoviesId.length !== 0;

        return isStarMovies
            ? this.getContent()
            : (<div>No movies</div>)
    }

    getContent = () => {
        const {isStarMoviesLoaded, starMovies} = this.props;

        return isStarMoviesLoaded
            ? <MoviesList movies={starMovies}/>
            : (<Loader/>)
    };
}

const mapStateToProps = store => {
    return {
        starMoviesId: store.starMovies.starMoviesId,
        starMovies: store.bookmarksMovies.starMovies,
        isStarMoviesLoaded: store.bookmarksMovies.isStarMoviesLoaded
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadStarMovies: starMoviesId => dispatch(bookmarksActions.loadStarMovies(starMoviesId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Bookmarks)
