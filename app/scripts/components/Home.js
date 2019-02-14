import * as React from 'react';
import {JsonImporter} from '../lib/JsonImporter';
import Pagination from "react-js-pagination";
import FilmsList from './FilmsList';
import Constants from '../lib/Constants';

export default class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            films: [],
            activePage: 1,
            itemsCountPerPage: 1,
            totalItemsCount: 1000,
            filteredSearch: false
        }
    }

    componentDidMount() {
        this.sendRequest(this.state.activePage);
    }

    render() {
        if (this.state.films.length > 0)
        return (
            <div>
                <input ref='searchNameInput' onChange={this.searchFilm} type="text" placeholder='Film title'/>
                <FilmsList films={this.state.films}/>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={this.state.itemsCountPerPage}
                    totalItemsCount={this.state.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                />
            </div>
        );
        else return (
            <div>
                No films
            </div>
        )
    }

    /**
     * @param {number} pageNumber
     */
    sendRequest = (pageNumber = this.state.activePage) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/popular?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`);

        filmsList.then(response => {
            this.setState({
                films: response.results,
                itemsCountPerPage: response.results.length,
                totalItemsCount: response.total_results,
                activePage: pageNumber,
                filteredSearch: false
            });
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