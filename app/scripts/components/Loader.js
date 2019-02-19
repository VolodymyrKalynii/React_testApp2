import * as React from 'react';

export default class Loader extends React.Component {
    render() {
        return (
            <div className="preloader">
                <div className="preloader__inner">
                    <div className="preloader__round"/>
                </div>
            </div>
        );
    }
}