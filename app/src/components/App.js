import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                <header className="nav">
                    <div className="nav-center">
                        <p id="logo">Time Series Anomaly Turk</p>
                </div>
                </header>
                <main>{this.props.children}</main>
            </div>
        );
    }
}