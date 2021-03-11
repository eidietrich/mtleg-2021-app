import React from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

const leadershipCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -0.25em;

  > div {
    flex-grow: 1 0 200px;
    margin: 0.25em;
    margin-bottom: 0.75em;
    padding: 0.5em;
    background: var(--tan1);
    border: 1px solid var(--tan6);
  }
`

const roleCss = css`
  font-weight: bold;
  text-transform: uppercase;
  color: var(--tan6);
  font-size: 0.9em;
`
const nameCss = css`
  color: #444;
`
const memberContainerCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: -0.25em;

  >div {
    flex-grow: 0 0 200px;
    width: 160px;
    margin: 0.25em;
    border: 1px solid var(--tan4);
    background: var(--tan1);
    padding: 0.25em;

    @media screen and (max-width: 468px) {
      width: 135px;
    }
  }
`
const CommitteeMembership = ({members}) => {
  const chair = members.find(d => d.role === 'Chair')
  const gopViceChair = members.find(d => d.role === 'Majority Vice Chair' || (d.role === 'Vice Chair' && d.party === 'R'))
  const demViceChair = members.find(d => d.role === 'Minority Vice Chair' || (d.role === 'Vice Chair' && d.party === 'D'))
  const otherMembers = members.filter(d => d.role === 'Member')
      .sort((a, b) => a.party === 'R' ? -1 : 1)
  return <div>
    <div css={leadershipCss}>
      <div>
        <div css={roleCss}>Commmittee chair</div>
        <Lawmaker member={chair} />
      </div>
      {gopViceChair && <div>
        <div css={roleCss}>Majority vice-chair</div>
        <Lawmaker member={gopViceChair} />
      </div>}
      {demViceChair && <div>
        <div css={roleCss}>Minority vice-chair</div>
        <Lawmaker member={demViceChair} />
      </div>}
    </div>
    
    <div css={memberContainerCss}>
        
        {
            otherMembers.map(member => <Lawmaker key={member.name} member={member} />)
        }
    </div>
  </div>
}

export default CommitteeMembership

const detailCss = css`
  font-size: 0.8em;
  font-style: italic;
`

const Lawmaker = props => {
  const { member } = props
  const { name, key, party, locale } = member
  return <div>
    <div><Link to={`/lawmakers/${key}`}>{name}</Link></div>
    <div css={detailCss}>{party}-{locale}</div>
  </div>
}