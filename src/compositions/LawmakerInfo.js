import React from 'react';

const LawmakerInfo = ({name, party, district, residence, roles, history}) => {
  return <div>
      <div>Party: {party}</div>
      <div>District: {district}</div>
      <div>Residence: {residence}</div>
      {
        roles ?
        <div>Leadership roles: {roles}</div>
        : null
      }
      {
        history ?
        <div>Experience in past legislatures: {history}</div>
        : null
      }
  </div>
};

export default LawmakerInfo