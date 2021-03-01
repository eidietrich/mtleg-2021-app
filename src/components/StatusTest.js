// General purpose table for displaying list of bills
// e.g. bills a given lawmaker has sponsored
// or key bills on index page
// or bills at given point in process

import React, { Component } from 'react';
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

// import { AnchorLink } from "gatsby-plugin-anchor-links";

import {
  statusColors,
  partyColors
} from '../config/config'

import {
  billUrl,
  lawmakerUrl
} from '../config/utils'
import {
  tableStyle,
  noteStyle
} from '../config/styles';

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
const DEFAULT_SORT = (a, b) => +a.identifier.substring(3,) - +b.identifier.substring(3,)
const defaultState = {
  isTruncated: true
}

class StatusTests extends Component {
  constructor(props) {
    super(props)
    this.state = { ...(props.defaultState || defaultState) }

    this.toggleDisplayLimit = this.toggleDisplayLimit.bind(this)
  }

  toggleDisplayLimit() {
    this.setState({ isTruncated: !this.state.isTruncated })
  }

  render() {
    const { bills, suppressCount } = this.props
    const sortFunction = this.props.sortFunction || DEFAULT_SORT
    const { isTruncated } = this.state
    const displayLimit = this.props.displayLimit || DEFAULT_DISPLAY_LIMIT

    // console.log(bills)

    if (bills.length === 0) {
      return <div css={noteStyle}>None at present</div>
    }
    const sorted = bills.sort(sortFunction)
    const rendered = isTruncated ? sorted.slice(0, displayLimit) : sorted
    const rows = rendered.map((bill, i) => <Test key={String(i)} {...bill} />)

    return <div>
      <table css={tableStyle}>
        {/* <thead>
          <tr>
            <th>Bill</th>
            <th>Status</th>
          </tr>
        </thead> */}
        <tbody>{rows}</tbody>
      </table>
      <div css={noteStyle}>
        { !suppressCount && <span>Showing {rendered.length} of {bills.length}</span>}
        {
          (bills.length > displayLimit) &&
          <span><span>. </span>
            <button css={inlineButtonCss} onClick={this.toggleDisplayLimit}>
              {isTruncated ? 'See all.' : 'See fewer.'}
            </button>
          </span>
        }

      </div>

    </div>

  }

}
const tableRowCss = css`
  /* background-color: #eae3da; */
  border-bottom: 2px solid #fff !important;
  td {
    /* padding: 0; */
  }
`

const tableBillCell = css`
  padding: 0;
`

const statusColCss = css`
  width: 10em;

  @media screen and (max-width: 468px) {
    width: 7em;
  }
`
const billLabelCss = css`
  font-style: italic;
  color: #666;
`
const billCss = css`
  display: block;
  font-size: 1.15em;
  font-weight: 600;
  font-style: italic;
  padding: 0.2em 0.2em;
  margin-left: -0.2em;
  /* background-color: #e0d4b8; */
  
  a {
    color: #473d29;
  }

  :hover {
    background-color: #cebc9f;
    color: #ce5a00 !important;
    text-decoration: none;
  }
`
const identifierCss = css`
  font-style: normal;
  color: #444;

`
const stepCss = css`
`
const labelCss = css`
  font-style: italic;
`
const billInfoLineCss = css`
  color: #ae9864;
`
const billLinkCss = css`
  /* opacity: 0.7; */
  margin-top: 0.3em;
  margin-right: 0.5em;
  display: inline-block;
  color: #ae9864;
  border: 1px solid #ae9864;
  padding: 0.2em 0.5em;

  :hover {
    color:  #ce5a00;
    border: 1px solid  #ce5a00;
    text-decoration: none;
  }
`
const pluralStory = val => (val !== 1) ? 'stories' : 'story'


const Test = ({ title, identifier, status, label, textUrl, fiscalNoteUrl, legalNoteUrl, numArticles, sponsor, progression }) => {
  const color = statusColors(status.status)
  console.log(progression)
  return (<tr css={tableRowCss} key={identifier}>
    <td css={tableBillCell}>

        <Link css={billCss} to={`/bills/${billUrl(identifier)}`}>
          <span css={identifierCss}>{identifier}:</span> {title}
        </Link>
      <div css={billLabelCss}>{label}</div>
      <div css={billInfoLineCss}>
        {sponsor && <Link css={billLinkCss} to={`/lawmakers/${lawmakerUrl(sponsor.name)}`}>
          From {sponsor.name} <span css={css`color: ${partyColors(sponsor.party)}; opacity: 0.8;`}>({sponsor.party})</span>
        </Link>}
        {textUrl && <a css={billLinkCss} href={textUrl} target="_blank" rel="noopener noreferrer">Bill text</a>}
        {fiscalNoteUrl && <a css={billLinkCss} href={fiscalNoteUrl} target="_blank" rel="noopener noreferrer">Fiscal note</a>}
        {legalNoteUrl && <a css={billLinkCss} href={legalNoteUrl} target="_blank" rel="noopener noreferrer">Legal note</a>}
        {(numArticles > 0) && <Link css={billLinkCss} to={`/bills/${billUrl(identifier)}`}><strong>{numArticles}</strong> MTFP {pluralStory(numArticles)}</Link>}
      </div>

    </td>
    <td css={[statusColCss, css`background-color: ${color}`]}>
      <div css={stepCss}>{status.step}</div>
      <div css={labelCss}>{status.label}</div>
    </td>
    <td css={css`width: 400px;`}>
        <div>Introduction: {progression.dates.introduction || 'none'}</div>
        <div>Initial hearing: {progression.dates.initialHearing || 'none'} {progression.status.firstCommitteeName}</div>
        <div>Committee vote: {progression.dates.firstCommitteeVote || 'none'} {progression.status.firstCommitteeAction}</div>
        <div>2nd Reading: {progression.dates.firstChamberSecondReading || 'none'} {progression.status.firstChamberSecondReading}</div>
        <div>3rd Reading: {progression.dates.firstChamberThirdReading || 'none'} {progression.status.firstChamberThirdReading}</div>
    </td>

  </tr>)
}

export default StatusTests