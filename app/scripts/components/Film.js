import * as React from 'react';
import Constants from '../lib/Constants';

export default class Film extends React.Component{
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.filmInfo.title}</h3>
                <h4>{this.props.filmInfo.tagline}</h4>
                <h4>{this.props.filmInfo.budget}</h4>
                <h4>{this.props.filmInfo.homepage}</h4>
                <h4>{this.props.filmInfo.runtime} minutes</h4>
                <h4>{this.props.filmInfo.release_date}</h4>
                <h4>{this.props.filmInfo.vote_average}</h4>
                <h4>{this.props.filmInfo.vote_count}</h4>
                <p>{this.props.filmInfo.overview}</p>
                <img src={Constants.IMG_ROOT+this.props.filmInfo.poster_path} alt=''/>
            </div>
        );
    }

}