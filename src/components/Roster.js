import React from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import { 
  mostRecentActionDate
} from '../data/summary.json'

import LawmakerTable from '../components/LawmakerTable'

import {
  numberFormat,
  dateFormat,
} from '../config/utils'

const sideBySideTableCss = css`
  display: flex;
  flex-wrap: wrap;
  margin: -0.5em;
`
const tableContainerCss = css`
  flex: 1 0 300px;
  min-width: 380px;
  margin: 0.5em;
`

const simpleLine = d => <li key={d.key}><Link to={`/lawmakers/${d.key}`}>
  {d.district}: <strong>{d.name}</strong> ({d.party}-{d.residence})
</Link></li>

const Roster = (props) => {
  const { title, lawmakers, chamberLabel } = props
  const numVotesRecorded = lawmakers.map(d => d.votingSummary.numVotesRecorded)[1]
  return <div>
    <h3>{title}</h3>
    
    <div css={sideBySideTableCss}>
      <div css={tableContainerCss}>
        <h4>Republicans</h4>
        <LawmakerTable lawmakers={lawmakers.filter(d => d.party === 'R')} />
      </div>

      <div css={tableContainerCss}>
        <h4>Democrats</h4>
        <LawmakerTable lawmakers={lawmakers.filter(d => d.party === 'D')} />
      </div>
    </div>
    <div className="note">Voting metrics based on {numberFormat(numVotesRecorded)} votes recorded on the {chamberLabel} floor through {dateFormat(new Date(mostRecentActionDate))}.</div>
    
  </div>
}


export default Roster