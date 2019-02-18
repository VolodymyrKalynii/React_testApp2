import * as React from 'react';

export default class SearchField extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='searchField'>
                <input className='searchField__input' ref='searchNameInput' onChange={this.searchFilm} type="text" placeholder='Film title'/>
            </div>
        );
    }


    searchFilm = () => {
        const movieName = this.refs.searchNameInput.value;

        this.props.getName(movieName);
        this.props.makeSearch();
    }
}