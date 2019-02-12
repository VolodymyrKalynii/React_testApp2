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
            totalItemsCount: 1000
        }
    }

    componentDidMount() {
        this.sendRequest(this.state.activePage);
    }

    render() {
        if (this.state.films.length > 0)
        return (
            <div>
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
    sendRequest = (pageNumber) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/popular?api_key=${Constants.API_KEY}&language=en-US&page=${pageNumber}`);

        filmsList.then(response => {
            this.setState({
                films: response.results,
                itemsCountPerPage: response.results.length,
                totalItemsCount: response.total_results,
                activePage: pageNumber
            });
        });
    };

    handlePageChange = (pageNumber) => {
        this.sendRequest(pageNumber);
    };
}