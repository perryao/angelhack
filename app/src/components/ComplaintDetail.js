import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis,CartesianGrid } from 'recharts';

export default class ComplaintDetail extends Component {
    render() {
        const complaint = this.props.complaint;
        if (!complaint) {
            return (
                <div>Select a Production Code</div>
            )
        }
        const data = [{name: 'one', value: 1}, {name: 'two', value: 2}, {name: 'three', value: 3}, {name: 'four',value: 4}, {name: 'five', value: 5}];
        return (
            <div>
                <div className="content">
                    <h6>Complaint Summary</h6>
                    <p>{complaint.summary}</p>
                </div>
                <h2>Plant Anomaly Window</h2>
                <LineChart width={500} height={300} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                </LineChart>
            </div>
        )
    }
}