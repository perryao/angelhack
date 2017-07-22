import React, { Component } from 'react';
import ComplaintsTable from '../components/ComplaintsTable';
import { connect } from 'react-redux';
import { fetchComplaints } from '../actions';

export class HomePage extends Component {
    componentDidMount() {
        this.props.fetchComplaints();
    }

    render() {
        return (
            <div>
                <ComplaintsTable complaints={this.props.complaints}/>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        complaints: state.complaints,
    }),
    (dispatch) => ({
        fetchComplaints: () => dispatch(fetchComplaints())
    })
)(HomePage);