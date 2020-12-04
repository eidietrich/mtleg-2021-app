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
  const voteFilter = d => true
  const rows = votes
    .filter(voteFilter)
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
  'Y' : { label: 'YEA', color: positionColors['Y']},
  'N' : { label: 'NAY', color: positionColors['N']}
}

const Vote = ({identifier, title, lawmakerVote, voteOutcome, voteGopCaucus, voteDemCaucus}) => {
  
  const voteText = voteOptions[lawmakerVote].label
  const voteColor = voteOptions[lawmakerVote].color
  const voteCellStyle = css`background-color: ${voteColor};`
  return <tr>
    <td><Link to={`/bills/${billUrl(identifier)}`}>{identifier}: {title}</Link></td>
    <td>House XXXXX Committee on Stuff</td>
    <td css={[cellCenteredStyle, voteCellStyle]}>
      {voteText}
    </td>
    <td css={cellCenteredStyle}>{voteOutcome}</td>
    <td css={cellCenteredStyle}>{voteGopCaucus}</td>
    <td css={cellCenteredStyle}>{voteDemCaucus}</td>
  </tr>
}

export default LawmakerVotes