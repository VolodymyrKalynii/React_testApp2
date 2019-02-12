import * as React from 'react';
import {JsonImporter} from '../lib/JsonImporter';
import Constants from '../lib/Constants';
import Film from './Film';


export default class FilmWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            loadedFilm: false,
            filmInfo: ''
        }
    }

    componentDidMount() {
        this.sendRequest(this.props.match.params.id);
    }

    render() {
        if (this.state.loadedFilm) {
            return (
                <Film filmInfo={this.state.filmInfo}/>
            )
        }
        else {
            return (
                <div>
                    loading
                </div>
            );
        }
    }

    /**
     * @param {number} movieId
     */
    sendRequest = (movieId) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`);

        filmsList.then(response => {
            // console.log(response);
            this.setState({
                loadedFilm: true,
                filmInfo: response
            })
        });
    };

}