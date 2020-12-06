import React from 'react';
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
  tableStyle,
  cellCenteredStyle,
  noteStyle
} from '../config/styles'

import {
  billUrl
} from '../config/utils'

import {
  positionColors
} from '../config/config'
/*
Design needs:
Generalized 'Show more component' --> Also used in bill actions

Data structure:
{
  lastName
  votes {
    identifier
    title
    isMajor
    lawmakerVote
    voteOutcome
    voteGopCaucus
    voteDemCaucus
  }
}
*/

const LawmakerVotes = ({lastName, votes}) => {
  // TODO - filter these just to key votes
  const rows = votes.slice(0,20)
    .filter(vote => vote.keyVote)
    .map(d => <Vote {...d} />)
  return <div>
      <h3>Key 2021 votes by {lastName}</h3>
      <div css={noteStyle}>As judged by MTFP reporters covering the Legislature</div>
      <table css={tableStyle}>
        <thead>
          <tr>
            <th>Bill</th>
            <th>Place</th>
            <th>{lastName} vote</th>
            <th>Vote outcome</th>
            <th>GOP votes</th>
            <th>Dem votes</th>
          </tr>
        </thead>
        {rows}
      </table>
      <div css={noteStyle}>Showing {votes.length} votes</div>
  </div>
};

const voteOptions = {
  'yes' : { label: 'YEA', color: positionColors['Y']},
  'no' : { label: 'NAY', color: positionColors['N']}
}

const Vote = ({billKey, bill, action, lawmakerVote,
    motionPassed, count,
    demSupported, demCount,
    gopSupported, gopCount,
  }) => {
  
  // TODO: Get bill title in here

  const voteColor = (voteOptions[lawmakerVote] && voteOptions[lawmakerVote].color) || '#ccc'
  
  const voteCellStyle = css`
    text-transform: capitalize;
    background-color: ${voteColor};
    font-weight: bold;
    border-right: 1px solid #444;
    border-left: 1px solid #444;
  `
  return <tr>
    <td>
      <div><Link to={`/bills/${billKey}`}>{bill}</Link></div>
      <div>{action}</div>
    </td>
    <td>House XXXXX Committee on Stuff</td>
    <td css={[cellCenteredStyle, voteCellStyle]}>
      {lawmakerVote}
    </td>
    <td css={[cellCenteredStyle]}>{count.yes}-{count.no}</td>
    <td css={[cellCenteredStyle]}>{gopCount.yes}-{gopCount.no}</td>
    <td css={[cellCenteredStyle]}>{demCount.yes}-{demCount.no}</td>
  </tr>
}

export default LawmakerVotes