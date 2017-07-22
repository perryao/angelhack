import React, { Component } from 'react';

const ComplaintRow = ({ complaint }) => {
    const items = Object.keys(complaint).map((key, index) => {
        return <td key={index}>{complaint[key]}</td>
    });
    return (
        <tr>
            {items}
        </tr>
    );
};

const ComplaintsTable = ({ complaints }) => {
    const complaintRows = complaints.map((complaint, index) => {
        return (
            <ComplaintRow key={index} complaint={complaint}/>
        );
    });
    const complaintHeaders = process.env.COMPLAINT_HEADERS.split(',');
    const headerItems = complaintHeaders.map((header, index) => {
        return <th key={index}>{header}</th>
    });
    return (
        <div className='complaints-table'>
            <table className='table'>
                <thead>
                    <tr>
                        {headerItems}
                    </tr>
                </thead>
                <tbody>
                    {complaintRows}
                </tbody>
            </table>
        </div>
    );
};

export default ComplaintsTable;