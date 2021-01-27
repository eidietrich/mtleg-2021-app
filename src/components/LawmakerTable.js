// General purpose table for displaying list of bills
// e.g. bills a given lawmaker has sponsored
// or key bills on index page
// or bills at given point in process

import React from 'react';
import PropTypes from "prop-types"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
    positionColors,
    partyColors
} from '../config/config'

import {
    lawmakerUrl,
    percentFormat
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
const lawmakerTableCss = css`
    max-width: 95vw;
`

const tableLinkStyle = css`
    font-weight: bold;
  
  /* :hover {
    background-color: #ddd;
  }
  a {
    color: #444;
    display: block;
  }
  a:hover {
    color: #222;
    text-decoration: none;
  } */
  
`
const partyBlockCss = party => css`
    display: inline-block;
    position: relative;
    top: 1px;
    width: 0.8em;
    height: 0.8em;
    margin-right: 0.2em;
    border-radius: 50%;
    background-color: ${partyColors(party)};
`
const colorGopCss = css`
    color: ${partyColors('R')};
    font-weight: bold;
`
const colorDemCss = css`
    color: ${partyColors('D')};
    font-weight: bold;
`

const partyControlCss = party => css`
    background-color: ${partyColors(party)};
    font-weight: bold;
    color: #fff;
`
const col1 = css`min-width: 3em;`
const col2 = css`
    min-width: 12em;

    @media screen and (max-width: 468px) {
        min-width: 8em;
    }
    
`
const col3 = css`
    min-width: 4em;
    text-align: right;
`
const col4 = css`
    min-width: 5.5em;
    text-align: right;
`

const LawmakerTable = ({ lawmakers }) => {
    // console.log(lawmakers)
    const rows = lawmakers
        .map(lawmaker => <Row key={lawmaker.key} {...lawmaker} />)
    return <div>
        <table css={[tableStyle, lawmakerTableCss]}>
            <thead>
                <tr>
                    <th css={col1}>District</th>
                    <th css={col2}>Lawmaker</th>
                    <th css={col3}>Votes in majority</th>
                    <th css={col4}>
                        <div>w/ most Rs</div>
                        <div>w/ most Ds</div>
                    </th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
        {/* <div css={noteStyle}>Showing {bills.length} bills</div> */}
    </div>
};

const Row = ({ name, title, party, district, residence, votingSummary }) => {
    const districtLabel = district.key
    // console.log(votingSummary)
    const { numVotesRecorded, fractionVotesWithMajority, fractionVotesWithGopMajority, fractionVotesWithDemMajority } = votingSummary
    // if (numVotesRecorded === 0) return null
    return (<tr key={name}>
        <td css={[col1, partyControlCss(party)]}>
            {districtLabel}
        </td>
        <td css={[col2]}>
            <div css={tableLinkStyle}><Link to={`/lawmakers/${lawmakerUrl(name)}`}>{name}</Link></div>
            <div>{party}-{residence}</div>
        </td>
        <td css={col3}>
            {percentFormat(fractionVotesWithMajority)}
        </td>
        <td css={col4}>
            <div>
                <span css={colorGopCss}>{percentFormat(fractionVotesWithGopMajority)}</span> w/ Rs
            </div>
            <div>
                <span css={colorDemCss}>{percentFormat(fractionVotesWithDemMajority)}</span> w/ Ds
            </div>
        </td>
    </tr>)
}



export default LawmakerTable