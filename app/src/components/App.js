import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div>
                <header className="nav">
                </header>
                <main>{this.props.children}</main>
            </div>
        );
    }
}