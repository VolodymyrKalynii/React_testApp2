import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import Loader from '../components/Loader';
import SearchField from '../components/SearchField';
import MovieBlock from '../components/MovieBlock';
import {loadMoviesByPageNumber, loadGenres, loadMoviesByNameAndPage} from '../redux/actions';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.activePage = this.props.activePage;

        this.loadGenres = this.props.loadGenres;
        this.loadMoviesByPageNumber = this.props.loadMoviesByPageNumber;
        this.loadMoviesByNameAndPage = this.props.loadMoviesByNameAndPage;
    }

    componentDidMount() {
        this.loadMoviesByPageNumber(this.activePage);
        this.checkGenres();
    }

    shouldComponentUpdate(nextProps) {
        const {isMoviesLoaded, isGenresLoaded} = nextProps;

        return isMoviesLoaded && isGenresLoaded;
    }

    render() {
        const {isMoviesLoaded, isGenresLoaded} = this.props;
        const allowRenderContent = isMoviesLoaded && isGenresLoaded;

        console.log('render');
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
        this.activePage = 1;

        this.searchMovieName
            ? this.loadMoviesByNameAndPage(this.searchMovieName, this.activePage)
            : this.loadMoviesByPageNumber(this.activePage);
    };

    /**
     * @param {number} data
     */
    handlePageChange = (data) => {
        const {filteredSearch} = this.props;
        this.activePage = data.selected + 1;

        filteredSearch
            ? this.loadMoviesByNameAndPage(this.searchMovieName, this.activePage)
            : this.loadMoviesByPageNumber(this.activePage);
    };

    /**
     * Перевіряє чи є об"єкт з жанрами.
     */
    checkGenres = () => {
        const {genres} = this.props;

        genres.length === 0
            ? this.loadGenres()
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
        loadGenres: () => dispatch(loadGenres()),
        loadMoviesByPageNumber: pageNumber => dispatch(loadMoviesByPageNumber(pageNumber)),
        loadMoviesByNameAndPage: (searchMovieName, pageNumber) => dispatch(loadMoviesByNameAndPage(searchMovieName, pageNumber))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
    genres: PropTypes.array.isRequired,
};