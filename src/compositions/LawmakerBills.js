import React from 'react';
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
  positionColors
} from '../config/config'

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

const tableLinkStyle = css`
  
  :hover {
    background-color: #ddd;
  }
  a {
    color: #444;
    display: block;
  }
  a:hover {
    color: #222;
    text-decoration: none;
  }
  
`

const LawmakerBills = ({bills}) => {
  const rows = bills
    .map(bill => <Bill key={bill.key} {...bill}/>)
  return <div>
      <h3>Bills sponsored</h3>
      <table css={tableStyle}>
        <tbody>{rows}</tbody>
      </table>
      {/* <div css={noteStyle}>Showing {bills.length} bills</div> */}
  </div>
};

const statusStyle = (status) => {
  // TODO - separate this logic out, check for coverage in process step
  if (status === 'Became Law') {
    return css`
      background-color: ${positionColors.Y};
      border-bottom: 1px solid #ddd !important;
    `
  } else if (status === 'Probably Dead') {
    return css`
      background-color: ${positionColors.N};
      border-bottom: 1px solid #fff !important;
    `
  } else {
    return css`
      background-color: #ddd;
      border-bottom: 1px solid #fff !important;
    `
  }
}

const Bill = ({title, identifier, status}) => {
  return (<tr key={identifier}>
        <td css={css`background-color: ${status.color}`}>
            {status.label}
        </td>
        <td css={tableLinkStyle}>
           <Link to={`/bill/${billUrl(identifier)}`}>{identifier}: {title}</Link>
        </td>
    </tr>)
}

Bill.propTypes = {
  title: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
}

export default LawmakerBills