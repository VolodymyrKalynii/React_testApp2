import * as React from 'react';
import {JsonImporter} from '../lib/JsonImporter';
import Pagination from "react-js-pagination";
import FilmsList from './FilmsList';
import Constants from '../lib/Constants';
import PageActions from '../redux/actions/page';
import connect from 'react-redux/es/connect/connect';

class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            genres: [],
            activePage: 1,
            itemsCountPerPage: 1,
            isGenresLoaded: false,
            isFilmsLoaded: false,
            totalItemsCount: 1000,
            filteredSearch: false
        };

        this.loadGenresAction = this.props.loadGenresAction;
    }

    componentDidMount() {
        this.sendRequest(this.state.activePage);
        // this.getGenres();

        this.checkGenres()

    }

    render() {
        if (this.state.isFilmsLoaded && this.state.isGenresLoaded)
        return (
            <div>
                <input ref='searchNameInput' onChange={this.searchFilm} type="text" placeholder='Film title'/>
                {this.renderFilmsBlock()}
            </div>
        );
        else return (
            <div>
                loading...
            </div>
        )
    }

    renderFilmsBlock = () => {
        if (this.state.films.length === 0) {
            return <div>No films</div>
        } else {
            return (
                <div>
                    <FilmsList films={this.state.films} genres={this.state.genres}/>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.itemsCountPerPage}
                        totalItemsCount={this.state.totalItemsCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>
            )
        }
    };

    checkGenres = () => {
        const {genres} = this.props;

        console.log(genres);

        if (genres.length === 0) {
            this.loadGenres();
        } else {
            this.setState({
                isGenresLoaded: true,
                genres
            })
        }


    };

    /**
     * @param {number} pageNumber
     */
    sendRequest = (pageNumber = this.state.activePage) => {
        // console.log('sendRequest');
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/popular?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`);

        filmsList.then(response => {
            this.setState({
                films: response.results,
                itemsCountPerPage: response.results.length,
                totalItemsCount: response.total_results,
                activePage: pageNumber,
                isFilmsLoaded: true,
                filteredSearch: false
            });
        });
    };

    /**
     */
    // getGenres = () => {
    //     const filmsList = JsonImporter.import(`${Constants.API_ROOT}/genre/movie/list?api_key=${Constants.API_KEY}&language=en-US`);
    //     // console.log('request');
    //     // console.log(Date.now());
    //     filmsList.then(response => {
    //         this.setState({
    //             isGenresLoaded: true,
    //             genres: response.genres
    //         });
    //         // console.log(Date.now());
    //     });
    // };
    /**
     */
    loadGenres = () => {
        console.log('request');
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/genre/movie/list?api_key=${Constants.API_KEY}&language=en-US`);
        filmsList.then(response => {

            // console.log(response.genres);
            this.loadGenresAction(response.genres);
            this.setState({
                isGenresLoaded: true,
                genres: response.genres
            });
            // console.log(Date.now());
        });
    };

    sendSearchingRequest = (filmName, pageNumber = 1) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/search/movie?api_key=${Constants.API_KEY}&language=en-US&query=${filmName}&page=${pageNumber}`);

        filmsList.then(response => {
            this.setState({
                films: response.results,
                itemsCountPerPage: response.results.length,
                totalItemsCount: response.total_results,
                filteredSearch: true
            });
        });
    };

    handlePageChange = (pageNumber) => {
        const filteredSearch = this.state.filteredSearch;
        const filmName = this.refs.searchNameInput.value;

        filteredSearch
            ? this.sendSearchingRequest(filmName, pageNumber)
            : this.sendRequest(pageNumber);
    };

    searchFilm = () => {
        const filmName = this.refs.searchNameInput.value;

        filmName
            ? this.sendSearchingRequest(filmName)
            : this.sendRequest();
    };
}


const mapStateToProps = store => {
    // console.log(store);
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