import React from 'react';

const LawmakerCommittees = ({ committees }) => {
    return <div >
        <h3>Committee assignments</h3>
        <ul>
            {committees.map(c => <li key={c.committee}>{c.committee}{(c.role != 'Member') ? ` - ${c.role}` : null}</li>)}
        </ul>
        <div className='note'>**Actually 2019 committees for development purposes. TODO - Set these up to link to committee pages.</div>

    </div>
};

export default LawmakerCommittees