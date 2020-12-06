import React from 'react';
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
  numberFormat,
  percentFormat,
  capitalize
} from '../config/utils'

import {
  noteStyle
} from '../config/styles'

const textStyle = css`
  font-size: 1em;
  margin-bottom: 0.2em;
`

const pullStatContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  border: 1px solid #ddd;
  padding: 0.5em;
  margin-bottom: 0.5em;

  div {
    flex: 1 1 50px;
    max-width: 150px;
    margin: 0.5em;
  }
  
`

const pullStatStyle = css`
  font-size: 2.5em;
  font-weight: bold;
  display: block;
  text-align: center;

  @media screen and (max-width: 400px) {
    font-size: 1.5em;
  }
`
const labelStyle = css`
  font-size: 1em;
  display: block;
  text-align: center;

  @media screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`

const LawmakerVotingSummary = ({lawmaker, votingSummary}) => {
  // console.log('xx', votingSummary)
  return <div>
      <h3>Voting statistics</h3>
      
      <div css={textStyle}>Of {numberFormat(votingSummary.numVotesCast)} {capitalize(lawmaker.chamber)} floor votes:</div>
      <div css={pullStatContainerStyle}>
        <div>
          <span css={pullStatStyle}>{percentFormat(votingSummary.fractionVotesWithMajority)}</span>
          <span css={labelStyle}>With majority of {capitalize(lawmaker.chamber)} lawmakers</span>
        </div>
        <div>
          <span css={pullStatStyle}>{percentFormat(votingSummary.fractionVotesWithGopMajority)}</span>
          <span css={labelStyle}>With majority of GOP caucus</span>
        </div>
        <div>
          <span css={pullStatStyle}>{percentFormat(votingSummary.fractionVotesWithDemMajority)}</span>
          <span css={labelStyle}>With majority of Dem. caucus</span>
        </div>
      </div>
      <div css={textStyle}>{lawmaker.lastName} has been absent or excused for {numberFormat(votingSummary.numVotesNotPresent)} votes.</div>
      <div css={noteStyle}>TK more description on these statistics</div>
  </div>
};

export default LawmakerVotingSummary