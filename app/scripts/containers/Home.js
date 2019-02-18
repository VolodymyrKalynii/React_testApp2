import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import {JsonImporter} from '../lib/JsonImporter';
import PageActions from '../redux/actions/page';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from '../components/Loader';
import SearchField from '../components/SearchField';
import MovieBlock from '../components/MovieBlock';

class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            movies: [],
            genres: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1000,
            isGenresLoaded: false,
            isMoviesLoaded: false,
            filteredSearch: false
        };

        this.loadGenresAction = this.props.loadGenresAction;
    }

    componentDidMount() {
        this.loadMoviesByPageNumber(this.state.activePage);
        this.checkGenres()
    }

    render() {
        const allowRenderContent = this.state.isMoviesLoaded && this.state.isGenresLoaded;

        return allowRenderContent
            ? this.getContent()
            : <Loader/>
    }

    getContent = () => {
        return (
            <div className='home'>
                <SearchField setSearchMovieName={this.setSearchMovieName} makeSearch={this.searchMovie}/>
                <MovieBlock
                    movies={this.state.movies}
                    genres={this.state.genres}
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    handlePageChange={this.handlePageChange}
                />
            </div>
        )
    };

    /**
     * @param {number} pageNumber
     */
    loadMoviesByPageNumber = (pageNumber = this.state.activePage) => {
        const moviesList = JsonImporter.import(RequestsURLsCreator.loadPopularMoviesByPageNumber(pageNumber));

        moviesList.then(response => {
            setTimeout(() => {
                this.setState({
                    isMoviesLoaded: true,
                    filteredSearch: false,
                    activePage: pageNumber,
                    movies: response.results,
                    totalItemsCount: response.total_results,
                    itemsCountPerPage: response.results.length
                });
            }, 1);
        });
    };

    /**
     * @param {number} pageNumber
     */
    loadMoviesByNameAndPage = (pageNumber = 1) => {
        const moviesList = JsonImporter.import(RequestsURLsCreator.loadPopularMoviesByNameAndPageNumber(pageNumber, this.searchMovieName));

        moviesList.then(response => {
            this.setState({
                filteredSearch: true,
                movies: response.results,
                totalItemsCount: response.total_results,
                itemsCountPerPage: response.results.length
            });
        });
    };

    /**
     * @param {string} value
     */
    setSearchMovieName = (value) => {
        this.searchMovieName = value;
    };

    searchMovie = () => {
        this.searchMovieName
            ? this.loadMoviesByNameAndPage()
            : this.loadMoviesByPageNumber();
    };

    /**
     * @param {number} pageNumber
     */
    handlePageChange = (pageNumber) => {
        const filteredSearch = this.state.filteredSearch;

        filteredSearch
            ? this.loadMoviesByNameAndPage(pageNumber)
            : this.loadMoviesByPageNumber(pageNumber);
    };

    /**
     * Перевіряє чи є об"єкт з жанрами.
     */
    checkGenres = () => {
        const {genres} = this.props;

        genres.length === 0
            ? this.loadGenres()
            : this.setState({
                genres,
                isGenresLoaded: true
            })
    };

    loadGenres = () => {
        const genresList = JsonImporter.import(RequestsURLsCreator.loadGenres());

        genresList.then(response => {
            this.loadGenresAction(response.genres);
            this.setState({
                isGenresLoaded: true,
                genres: response.genres
            });
        });
    };
}

const mapStateToProps = store => {
    return {
        genres: store.genres
    }
};

const mapDispatchToProps = dispatch => {
    return {
        loadGenresAction: genres => dispatch(PageActions.loadGenres(genres))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home)

Home.propTypes = {
    genres: PropTypes.array.isRequired,
};