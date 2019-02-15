import * as React from 'react';
import {JsonImporter} from '../lib/JsonImporter';
import Constants from '../lib/Constants';
import Movie from '../containers/Movie';


export default class MovieWrapper extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            movieInfo: '',
            loadedFilm: false,
        };

        // this.requestQty = 0;
        // this.sendRequest(this.props.match.params.id);
    }
    //
    componentDidMount() {
        // console.log('Mount');
        this.loadMovieById(this.props.match.params.id);
    }
    //

    componentWillMount() {
        // this.sendRequest(this.props.match.params.id);
    }


    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log(nextProps.match.params.id);
    //     console.log(this.props.match.params.id);
    //     console.log(this.state.loadedFilm);
    //
    //     console.log(nextProps.match.params.id === this.props.match.params.id && !this.state.loadedFilm);
    //
    //     // return nextProps.match.params.id === this.props.match.params.id && !this.state.loadedFilm;
    //
    //
    //     if (nextProps.match.params.id === this.props.match.params.id){
    //         console.log('однакові ід');
    //         return !this.state.loadedFilm;
    //     }
    //     else if (nextProps.match.params.id !== this.props.match.params.id){
    //         console.log('різні ід');
    //         return true
    //     }
    //     else return true
    //
    // }

    componentWillReceiveProps(nextProps) {
        if (+nextProps.match.params.id !== this.state.movieInfo.id)
            this.loadMovieById(nextProps.match.params.id);
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     console.log('shouldUpdate');
    //     console.log(nextProps.match.params.id);
    //     console.log(this.state.filmInfo.id);
    //     console.log(this.state.loadedFilm);
    //
    //     if (+nextProps.match.params.id === this.state.filmInfo.id || !this.state.filmInfo.id ) {
    //         console.log('here');
    //         if (!this.state.filmInfo.id && this.state.loadedFilm) return false;
    //         return !this.state.loadedFilm;
    //     }
    //     else {
    //         console.log('here 2');
    //         this.requestQty=0;
    //         return true
    //     }
    //
    //     // if (nextProps.match.params.id === this.props.match.params.id){
    //     //     // console.log('однакові ід');
    //     //     // return !this.state.loadedFilm;
    //     // }
    //     // else if (nextProps.match.params.id !== this.props.match.params.id){
    //     //     console.log(this.requestQty);
    //     //     this.requestQty=0;
    //     //     // console.log('різні ід');
    //     //     // return true
    //     // }
    //     // return true
    //
    // }

    // componentWillUpdate(nextProps) {
    //     console.log('WillUpdate');
    //     // console.log(this.requestQty);
    //     console.log(nextProps.match.params.id);
    //     if (this.requestQty < 1)
    //         this.sendRequest(nextProps.match.params.id);
    //
    // }


    render() {
        return this.state.loadedFilm
            ? <Movie movie={this.state.movieInfo}/>
            : <div>loading...</div>
    }

    /**
     * @param {number} movieId
     */
    loadMovieById = (movieId) => {
        const filmsList = JsonImporter.import(`${Constants.API_ROOT}/movie/${movieId}?api_key=${Constants.API_KEY}&language=en-US`);

        filmsList.then(response => {
            this.setState({
                loadedFilm: true,
                movieInfo: response
            })
        });
    };
}