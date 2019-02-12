import * as React from 'react';

export default class Film extends React.Component{
    constructor(props) {
        super(props);

        console.log(props);
    }

    render() {
        return (
            <div>
                <h3>{this.props.filmInfo.title}</h3>
            </div>
        );
    }

}