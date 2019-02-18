import * as React from 'react';
import Pagination from "react-js-pagination";
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import {JsonImporter} from '../lib/JsonImporter';
import MoviesList from '../components/MoviesList';
import PageActions from '../redux/actions/page';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from '../components/Loader';
import SearchField from '../components/SearchField';

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
                {/*<div className='searchField'>*/}
                    {/*<input className='searchField__input' ref='searchNameInput' onChange={this.searchFilm} type="text" placeholder='Film title'/>*/}
                {/*</div>*/}
                <SearchField getName={this.getName} makeSearch={this.searchFilm}/>
                {this.renderMoviesBlock()}
            </div>
        )
    };

    getName = (value) => {
        this.searchName = value;

    };

    renderMoviesBlock = () => {
        const allowRenderMovies = this.state.movies.length !== 0;

        return allowRenderMovies
            ? this.getMoviesBlock()
            : (<div>No movies</div>);
    };

    getMoviesBlock = () => {
        return (
            <div>
                <MoviesList movies={this.state.movies} genres={this.state.genres}/>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
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
            this.setState({
                isMoviesLoaded: true,
                filteredSearch: false,
                activePage: pageNumber,
                movies: response.results,
                totalItemsCount: response.total_results,
                itemsCountPerPage: response.results.length
            });
        });
    };

    /**
     * @param {string} movieName
     * @param {number} pageNumber
     */
    loadMoviesByNameAndPage = (movieName, pageNumber = 1) => {
        const moviesList = JsonImporter.import(RequestsURLsCreator.loadPopularMoviesByNameAndPageNumber(pageNumber, movieName));

        moviesList.then(response => {
            this.setState({
                filteredSearch: true,
                movies: response.results,
                totalItemsCount: response.total_results,
                itemsCountPerPage: response.results.length
            });
        });
    };

    searchFilm = () => {
        // const movieName = this.refs.searchNameInput.value;
        const movieName = this.searchName;

        // console.log(this.searchName);

        movieName
            ? this.loadMoviesByNameAndPage(movieName)
            : this.loadMoviesByPageNumber();
    };

    /**
     * @param {number} pageNumber
     */
    handlePageChange = (pageNumber) => {
        const filteredSearch = this.state.filteredSearch;
        // const movieName = this.refs.searchNameInput.value;
        const movieName = this.searchName;

        // console.log(this.searchName);

        filteredSearch
            ? this.loadMoviesByNameAndPage(movieName, pageNumber)
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