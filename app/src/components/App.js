import React, { Component } from 'react';

export default class App extends Component {
    render() {
        return (
            <div className="container">
                <header className="logo">
                </header>
                <main className="section">{this.props.children}</main>
            </div>
        );
    }
}