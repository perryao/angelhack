import React, {Component} from 'react';
import { LineChart, Line, XAxis, YAxis,CartesianGrid } from 'recharts';
import moment from 'moment';
import faker from 'faker';

function productionCodeToNanoseconds(code) {
  code = String(code);
  const yearNumber = code.slice(0, 1);
  const julianDate = code.slice(1, 4);
  const plantCode = code.slice(4, 8);
  const lineNumber = code.slice(8, 10);
  const militaryTime = code.slice(10, 14);

  const hours = militaryTime.slice(0, 2);
  const minutes = militaryTime.slice(2);

  const year = '201' + yearNumber;
  const date = makeDate(year, julianDate, hours, minutes);
  return date;
}

function makeDate(year, day, hours, minutes) {
  var date = new Date(year, 0); // initialize a date in `year-01-01`
  date = new Date(date.setDate(day)); // add the number of days
  date = new Date(date.setHours(hours));
  date = new Date(date.setMinutes(minutes));
  return date;
}
export default class ComplaintDetail extends Component {
    render() {
        const complaint = this.props.complaint;
        if (!complaint) {
            return (
                <div>Select a Production Code</div>
            )
        }
        // tank a temp between 60 and 80
        const startDate = productionCodeToNanoseconds(complaint.production_code);
        const dates = [];
        for (let i = 1; i < 10; i++) {
            dates.push(moment(startDate).add('minute', i * 10));
        }
        const data = dates.map(date => {
            return {
                name: date.format('h:mm s'),
                actual: faker.random.number({min: 60, max: 85}),
                acceptableHigh: 79,
                acceptableLow: 60
            }
        })
        const status = faker.random.arrayElement(['Idle', 'Production', 'Planned Downtime', 'Blocked', 'Process Failure', 'Cleaning']);
        return (
            <div>
                <div style={{'margin-top': '25px'}} className="content">
                    <h6>Complaint Summary</h6>
                    <p>{complaint.summary}</p>
                </div>
                <div className='content'>
                    <h3>Plant Status</h3>
                    <p>{status}</p>
                    <div className="block">
                        <a style={{'margin-right': '5px'}} onClick={() => this.props.onDecision(complaint)} className="button is-danger">Deny</a>
                        <a onClick={() => this.props.onDecision(complaint)} className="button is-success">Confirm</a>
                    </div>
                    <h3>Plant Anomaly Window</h3>
                </div>
               <LineChart width={800} height={400} data={data}>
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
                    <Line strokeWidth={5} type="monotone" dataKey="actual" stroke="#8884d8" />
                    <Line strokeWidth={10} type="monotone" dataKey="acceptableLow" stroke="#82ca9d" />
                    <Line strokeWidth={10} type="monotone" dataKey="acceptableHigh" stroke="#82ca9d" />
                </LineChart>
            </div>
        )
    }
}