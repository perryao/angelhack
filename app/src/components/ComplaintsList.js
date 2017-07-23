import React, { Component } from 'react';
import moment from 'moment';

const ComplaintRow = ({ complaint }) => {
    const date = moment(complaint.initial_receipt_date).format('dddd, MMMM Do YYYY');
    return (
        <div className='box'>
            <div className='media-content'>
                <div className='content'>
                    <p>
                        <strong>{date}</strong> <small>@{complaint.store_of_purchase}</small>
                        <br />
                        {complaint.summary}
                        <br />
                    </p>
                </div>
            </div>
        </div>
    );
};

const ComplaintsList = ({ complaints }) => {
    const complaintRows = complaints.map((complaint, index) => {
        return (
            <ComplaintRow key={index} complaint={complaint}/>
        );
    });
    return (
        <div className='complaints-table'>
            {complaintRows}
        </div>
    );
};

export default ComplaintsList;