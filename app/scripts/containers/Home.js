import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import Loader from '../components/Loader';
import SearchField from '../components/SearchField';
import MovieBlock from '../components/MovieBlock';
import {homePageActions, genresActions} from '../redux/actions';

class Home extends React.Component {
    activePage = this.props.activePage;

    componentDidMount() {
        const {loadMoviesByPageNumber} = this.props;

        loadMoviesByPageNumber(this.activePage);
        this.checkGenres();
    }

    shouldComponentUpdate(nextProps) {
        const {isMoviesLoaded, isGenresLoaded} = nextProps;

        return isMoviesLoaded && isGenresLoaded;
    }

    render() {
        const {isMoviesLoaded, isGenresLoaded} = this.props;
        const allowRenderContent = isMoviesLoaded && isGenresLoaded;

        return allowRenderContent
            ? this.getContent()
            : <Loader/>;
    }

    getContent = () => {
        const {moviesList, totalItemsCount, itemsCountPerPage, genres} = this.props;

        return (
            <div className='home'>
                <SearchField setSearchMovieName={this.setSearchMovieName} makeSearch={this.searchMovie}/>
                <MovieBlock
                    movies={moviesList}
                    genres={genres}
                    activePage={this.activePage - 1}
                    itemsCountPerPage={itemsCountPerPage}
                    totalItemsCount={totalItemsCount}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        );
    };

    /**
     * @param {string} value
     */
    setSearchMovieName = (value) => {
        this.searchMovieName = value;
    };

    searchMovie = () => {
        const {
            loadMoviesByPageNumber,
            loadMoviesByNameAndPage
        } = this.props;
        this.activePage = 1;

        this.searchMovieName
            ? loadMoviesByNameAndPage(this.searchMovieName, this.activePage)
            : loadMoviesByPageNumber(this.activePage);
    };

    /**
     * @param {number} data
     */
    handlePageChange = (data) => {
        this.activePage = data.selected + 1;
        const {
            filteredSearch,
            loadMoviesByPageNumber,
            loadMoviesByNameAndPage
        } = this.props;

        filteredSearch
            ? loadMoviesByNameAndPage(this.searchMovieName, this.activePage)
            : loadMoviesByPageNumber(this.activePage);
    };

    /**
     * Перевіряє чи є об"єкт з жанрами.
     */
    checkGenres = () => {
        const {genres, loadGenres} = this.props;

        genres.length === 0
            ? loadGenres()
            : null;
    };
}

const mapStateToProps = store => {
    return {
        genres: store.genres.genres,
        isGenresLoaded: store.genres.isGenresLoaded,
        filteredSearch: store.homePage.filteredSearch,
        moviesList: store.homePage.moviesList,
        activePage: store.homePage.activePage,
        totalItemsCount: store.homePage.totalItemsCount,
        itemsCountPerPage: store.homePage.itemsCountPerPage,
        isMoviesLoaded: store.homePage.isMoviesLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadGenres: () => dispatch(genresActions.loadGenres()),
        loadMoviesByPageNumber: pageNumber =>
            dispatch(homePageActions.loadMoviesByPageNumber(pageNumber)),
        loadMoviesByNameAndPage: (searchMovieName, pageNumber) =>
            dispatch(homePageActions.loadMoviesByNameAndPage(searchMovieName, pageNumber))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
    genres: PropTypes.array.isRequired,
};