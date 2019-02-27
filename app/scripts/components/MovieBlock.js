import * as React from 'react';
import MoviesList from './MoviesList';
import ReactPaginate from 'react-paginate';

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
                <ReactPaginate
                    previousLabel={'<'}
                    nextLabel={'>'}
                    pageCount={this.props.totalItemsCount / 20}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={2}
                    onPageChange={this.props.handlePageChange}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        )
    };
}