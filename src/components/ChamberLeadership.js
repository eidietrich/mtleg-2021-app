import React from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

const leadershipCss = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: -0.5em;
`
const leadershipItemCss = css`
  flex-grow: 1 0 200px;
  margin: 0.5em;
`
const roleCss = css`
  font-weight: bold;
  color: #806f47;
`
const nameCss = css`
  color: #444;
`
const ChamberLeadership = ({leadership}) => {
  return <div>
    <h3>Leadership</h3>
    <div css={leadershipCss}>
      {
        leadership.map((d,i) => {
          return <div key={d.name} css={leadershipItemCss}>
            <div css={roleCss}>{d.role}</div>
            <div css={nameCss}><Link to={`/lawmakers/${d.key}`}>{d.name}</Link></div>
          </div>
        })
      }
    </div>
  </div>
}

export default ChamberLeadership