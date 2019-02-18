import * as React from 'react';
import MoviesList from './MoviesList';
import Pagination from 'react-js-pagination';

export default class MovieBlock extends React.Component {
    render() {
        const allowRenderMovies = this.props.movies.length !== 0;

        return allowRenderMovies
            ? this.getMoviesBlock()
            : (<div>No movies</div>);
    }

    getMoviesBlock = () => {
        return (
            <div className='home__content'>
                <MoviesList movies={this.props.movies} genres={this.props.genres}/>
                <Pagination
                    activePage={this.props.activePage}
                    itemsCountPerPage={this.props.itemsCountPerPage}
                    totalItemsCount={this.props.totalItemsCount}
                    pageRangeDisplayed={5}
                    onChange={this.props.handlePageChange}
                />
            </div>
        )
    }
}