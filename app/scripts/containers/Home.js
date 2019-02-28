import * as React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';

import PageActions from '../redux/actions/page.actions';
import RequestsURLsCreator from '../js/RequestsURLsCreator';
import Loader from '../components/Loader';
import SearchField from '../components/SearchField';
import MovieBlock from '../components/MovieBlock';
import HomePageActions from '../redux/actions/homePage.actions';

class Home extends React.Component {
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
        this.loadMoviesByPageNumber = this.props.loadMoviesByPageNumber;
    }

    componentDidMount() {
        // dispatch(this.fetchPostsIfNeededAction(this.props.activePage));
        // dispatch(this.fetchPostsIfNeededAction(this.props.activePage));
        // dispatch(HomePageActions.loadMoviesByPageNumber(this.state.activePage));
        this.loadMoviesByPageNumber(this.state.activePage);

        // console.log(this.loadMoviesByPageNumber);
        // HomePageActions.loadMoviesByPageNumber(this.state.activePage);
        this.checkGenres();
    }

    render() {
        // const allowRenderContent = this.state.isMoviesLoaded && this.state.isGenresLoaded;
        const allowRenderContent = this.props.isMoviesLoaded;

        return allowRenderContent
            ? this.getContent()
            : <Loader/>;
    }

    getContent = () => {
        return (
            <div className='home'>
                тіпа список фільмів
                {/*<SearchField setSearchMovieName={this.setSearchMovieName} makeSearch={this.searchMovie}/>*/}
                {/*<MovieBlock*/}
                    {/*movies={this.state.movies}*/}
                    {/*genres={this.state.genres}*/}
                    {/*activePage={this.state.activePage}*/}
                    {/*itemsCountPerPage={this.state.itemsCountPerPage}*/}
                    {/*totalItemsCount={this.state.totalItemsCount}*/}
                    {/*handlePageChange={this.handlePageChange}*/}
                {/*/>*/}
            </div>
        );
    };

    /**
     * @param {number} pageNumber
     */
    loadMoviesByPageNumber = (pageNumber = this.state.activePage) => {
        fetch(RequestsURLsCreator.loadPopularMoviesByPageNumber(pageNumber))
            .then(response => response.json())
            .then(response => {
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
     * @param {number} pageNumber
     */
    loadMoviesByNameAndPage = (pageNumber = 1) => {
        fetch(RequestsURLsCreator.loadPopularMoviesByNameAndPageNumber(pageNumber, this.searchMovieName))
            .then(response => response.json())
            .then(response => {
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
     * @param {number} data
     */
    handlePageChange = (data) => {
        const pageNumber = data.selected + 1;
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
            });
    };

    loadGenres = () => {
        fetch(RequestsURLsCreator.loadGenres())
            .then(response => response.json())
            .then(response => {
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
        genres: store.movies.genres,
        moviesList: store.homePage.moviesList,
        activePage: store.homePage.activePage,
        isMoviesLoaded: store.homePage.isMoviesLoaded,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadGenresAction: genres => dispatch(PageActions.loadGenres(genres)),
        loadMoviesByPageNumber: pageNumber => dispatch(HomePageActions.loadMoviesByPageNumber(pageNumber))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

Home.propTypes = {
    genres: PropTypes.array.isRequired,
};