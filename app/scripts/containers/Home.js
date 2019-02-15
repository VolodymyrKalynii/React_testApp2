import * as React from 'react';
import Pagination from "react-js-pagination";
import connect from 'react-redux/es/connect/connect';

import {JsonImporter} from '../lib/JsonImporter';
import MoviesList from '../components/MoviesList';
import Constants from '../lib/Constants';
import PageActions from '../redux/actions/page';

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
        this.loadMoviesByPages(this.state.activePage);
        this.checkGenres()
    }

    render() {
        const allowRenderContent = this.state.isMoviesLoaded && this.state.isGenresLoaded;

        return allowRenderContent
            ? this.getContent()
            : (<div className='home'>loading..</div>)
    }

    getContent = () => {
        return (
            <div className='home'>
                <input ref='searchNameInput' onChange={this.searchFilm} type="text" placeholder='Film title'/>
                {this.renderMoviesBlock()}
            </div>
        )
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
    loadMoviesByPages = (pageNumber = this.state.activePage) => {
        const moviesList = JsonImporter.import(`${Constants.API_ROOT}/movie/popular?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`);

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
        const genresList = JsonImporter.import(`${Constants.API_ROOT}/genre/movie/list?api_key=${Constants.API_KEY}&language=en-US`);

        genresList.then(response => {
            this.loadGenresAction(response.genres);
            this.setState({
                isGenresLoaded: true,
                genres: response.genres
            });
        });
    };

    /**
     * @param {string} filmName
     * @param {number} pageNumber
     */
    loadMoviesByNamesAndPages = (filmName, pageNumber = 1) => {
        const moviesList = JsonImporter.import(`${Constants.API_ROOT}/search/movie?api_key=${Constants.API_KEY}&language=en-US&query=${filmName}&page=${pageNumber}`);

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
        const filmName = this.refs.searchNameInput.value;

        filmName
            ? this.loadMoviesByNamesAndPages(filmName)
            : this.loadMoviesByPages();
    };

    /**
     * @param {number} pageNumber
     */
    handlePageChange = (pageNumber) => {
        const filteredSearch = this.state.filteredSearch;
        const filmName = this.refs.searchNameInput.value;

        filteredSearch
            ? this.loadMoviesByNamesAndPages(filmName, pageNumber)
            : this.loadMoviesByPages(pageNumber);
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