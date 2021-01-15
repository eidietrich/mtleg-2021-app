// General purpose table for displaying list of bills
// e.g. bills a given lawmaker has sponsored
// or key bills on index page
// or bills at given point in process

import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
  statusColors
} from '../config/config'

import {
  billUrl
} from '../config/utils'
import {
  tableStyle,
  noteStyle
} from '../config/styles';


const tableLinkStyle = css``

const inlineButtonCss = css`
  display: inline-block;
  border: none;
  padding: 0;
  color: #ce5a00;
  background-color: #fff;
  text-align: left;
  font-size: 1em;
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;

  :hover {
    background-color: #fff;
    border: none;
    color: #ce5a00;
    text-decoration: underline;
  }
`

const DEFAULT_DISPLAY_LIMIT = 10
const DEFAULT_SORT = (a,b) => +a.identifier.substring(3,) - +b.identifier.substring(3,)
const defaultState = {
  isTruncated: true
}

class BillTable extends Component {
  constructor(props) {
    super(props)
    this.state = { ...(props.defaultState || defaultState) }

    this.toggleDisplayLimit = this.toggleDisplayLimit.bind(this)
  }

  toggleDisplayLimit() {
    this.setState({isTruncated: !this.state.isTruncated})
  }

  render() {
    const { bills } = this.props
    const { isTruncated } = this.state
    const displayLimit = this.props.displayLimit || DEFAULT_DISPLAY_LIMIT

    // console.log(bills)

    if (bills.length === 0) {
      return <div css={[noteStyle, css`color: #806f47;`]}>No bills at present</div>
    }
    const sorted = bills.sort(DEFAULT_SORT)

    let renderBills
    if (isTruncated) {
      renderBills = sorted.slice(0, displayLimit)
    } else {
      renderBills = sorted
    }

    const rows = renderBills.map((bill, i) => <Bill key={String(i)} {...bill} />)

    return <div>
      <table css={tableStyle}>
        <thead>
          <tr>
            <th>Bill</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
      <div css={noteStyle}>
        <span>Showing {renderBills.length} of {bills.length}. </span>
        {
          (bills.length > displayLimit) &&
            <button css={inlineButtonCss} onClick={this.toggleDisplayLimit}>
              {  isTruncated ? 'See all.' : 'See fewer.' }
            </button>
        }
        
      </div>

    </div>

  }

}
const tableRowCss = css`
  /* background-color: #eae3da; */
  /* border-bottom: 1px solid #fff !important; */
`

const statusColCss = css`
  width: 10em;
`
const billLabelCss = css`
  font-style: italic;
  padding-left: 0.5em;
  color: #666;
`
const billCss = css``
const stepCss = css`
`
const labelCss = css`
  font-style: italic;
  padding-left: 0.5em;
`

const Bill = ({ title, identifier, status, label }) => {
  const color = statusColors(status.status)
  return (<tr css={tableRowCss} key={identifier}>
    <td css={tableLinkStyle}>
      <div css={billCss}><Link to={`/bills/${billUrl(identifier)}`}>{identifier}</Link>: {title}</div>
      <div css={billLabelCss}>{label}</div>
    </td>
    <td css={[statusColCss, css`background-color: ${color}`]}>
      <div css={stepCss}>{status.step}</div>
      <div css={labelCss}>{status.label}</div>
    </td>
    
  </tr>)
}

Bill.propTypes = {
  title: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  status: PropTypes.object.isRequired,
}

export default BillTable