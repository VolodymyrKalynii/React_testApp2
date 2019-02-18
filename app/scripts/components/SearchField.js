import * as React from 'react';

export default class SearchField extends React.Component {
    render() {
        return (
            <div className='searchField'>
                <input className='searchField__input' ref='searchNameInput' onChange={this.searchMovie} type="text" placeholder='Film title'/>
            </div>
        );
    }

    searchMovie = () => {
        const movieName = this.refs.searchNameInput.value;
        const {setSearchMovieName, makeSearch} = this.props;

        setSearchMovieName(movieName);
        makeSearch();
    }
}