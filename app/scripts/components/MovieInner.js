import * as React from 'react';
import Movie from './Movie';

export class MovieInner extends React.Component{
    shouldComponentUpdate(nextProps) {
        const {movie: {id}} = this.props;

        return +nextProps.movie.id !== id;
    }

    render() {
        const {movie} = this.props;

        return <Movie movie={movie}/>
    }
}