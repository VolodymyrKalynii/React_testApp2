import * as React from 'react';
import FilmLink from './FilmLink';

export default class FilmsList extends React.Component{
    render() {
        return (
            <div className='filmsList'>
                {this.props.films.map((film, index) =>
                    <FilmLink key={index} film={film} genres={this.props.genres} />
                )}
            </div>
        )
    }
}