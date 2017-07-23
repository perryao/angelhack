import React, { Component } from 'react';
import ComplaintsList from '../components/ComplaintsList';
import ComplaintDetail from '../components/ComplaintDetail';
import { connect } from 'react-redux';
import { fetchComplaints, selectComplaint, clearComplaint } from '../actions';
import _ from 'lodash';

export class HomePage extends Component {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick(complaint) {
        this.props.selectComplaint(complaint);
    }

    componentDidMount() {
        this.props.fetchComplaints();
    }

    render() {
        console.log(this.props.productionCodes);
        const rows = this.props.complaints.map((x, i) => {
            const active = _.isEqual(x, this.props.selected);
            const className = active ? 'panel-block is-active' : 'panel-block';
            return (
                <a key={i} onClick={() => this.onClick(x)} className={className} style={{'width': `100%`}}>
                    Production Code: <strong className='is-pulled-left'> {x.production_code}</strong> 
                </a>
            )
        });
        return (
            <div className="columns">
                <div id='complaint-list' className="column is-one-third">
                    {/* <ComplaintsList complaints={this.props.complaints}/>  */}
                    <nav className="panel">
                        {rows}
                    </nav>
                </div>
                <div id='complaint-detail' className="column">
                    <ComplaintDetail onDecision={(complaint) => this.props.clearComplaint(complaint)} complaint={this.props.selected}/>
                </div>
            </div>
        );
    }
}

export default connect(
    (state) => ({
        complaints: state.complaints,
        selected: state.selected,
    }),
    (dispatch) => ({
        fetchComplaints: () => dispatch(fetchComplaints()),
        selectComplaint: (complaint) => dispatch(selectComplaint(complaint)),
        clearComplaint: (complaint) => dispatch(clearComplaint(complaint))
    })
)(HomePage);