import React from 'react';
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
  billUrl
} from '../config/utils'
import { 
  tableStyle,
  noteStyle
} from '../config/styles';
/*
Design needs needs:
-

Data structure:
{
  sponsoredBills {
    bill title
    bill identifier
    status
  }
}

*/

const LawmakerBills = ({bills}) => {
  const rows = bills.map(bill => <Bill key={bill.key} {...bill}/>)
  return <div>
      <h3>Bills sponsored</h3>
      <table css={tableStyle}>
        <tbody>{rows}</tbody>
      </table>
      <div css={noteStyle}>Showing {bills.length} bills</div>
  </div>
};

const Bill = ({title, identifier, status}) => {
  return (<tr key={identifier} className="tableRow">
        <td className="statusCol">
            {status}
        </td>
        <td className="billCol">
           <Link to={`/bill/${billUrl(identifier)}`}>{identifier}</Link>
        </td>
        <td className="billTitleCol">
           {title}
        </td>
    </tr>)
}

Bill.propTypes = {
  title: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default LawmakerBills