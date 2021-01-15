import React, { Component } from 'react';
import { css } from '@emotion/react'

import {
  dateFormat,
  parseDate
} from '../config/utils'

import {
  tableStyle
} from '../config/styles'

import {
  partyColors,
  positionColors
} from '../config/config'

/*
Design needs needs:
- Actions list (copy initially from 2019). Build in here.

Data structure:
{
  actions { // sorted chronologically, most recent first
    description
    date
    chamber (house/senate/governor)
    committee (categorical)
    vote {
      summaryText (e.g. '11-34')
    }
    isMajor (bool)
  }
}

*/


const descriptionCss = css`
  margin: 0.1em 0;
`

const recordingLineCss = css`
  font-style: italic;
  margin: 0.3em 0;
`

const defaultState = {
  showMinorActions: false,
  showVotes: true,
}

const dateCss = css`
  color: #806f47;
`

const committeeCss = css`
  font-style: italic;
`
const highlightRow = css`
  background-color: #cebc9f;
`

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


class BillActions extends Component {
  constructor(props) {
    super(props)
    this.state = { ...(props.defaultState || defaultState) }
    this.toggleShowMinorActions = this.toggleShowMinorActions.bind(this)
  }

  toggleShowMinorActions() {
    this.setState({
      showMinorActions: !this.state.showMinorActions
    })
  }

  render() {
    const { actions, lawsUrl } = this.props
    const { showMinorActions, showVotes } = this.state
    const actionFilter = showMinorActions ? d => true : d => d.isMajor
    const rows = actions
      .filter(actionFilter)
      .map((d, i) => Action(d, String(i), showVotes))
    return <div>
      <h3>Legislative actions</h3>
      <div className="note">
        {
          showMinorActions ?
            'Showing all recorded bill actions. '
            : 'Showing major bill actions only. '
        }
        <button css={inlineButtonCss} onClick={this.toggleShowMinorActions}>
          {
            showMinorActions ? 'See fewer' : 'See all.'
          }
        </button>
      </div>
      <table css={tableStyle}>
        <thead className="tableHeader">
          <tr>
            {/* <th>Symbol</th> */}
            <th>Date</th>
            <th>Action</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
      <div className="note">Note: This display may not fully represent more arcane procedural maneuvers. See the bill's <a href={lawsUrl}>page in LAWS</a> for an official reference.</div>

    </div>
  }
}
const Action = (action, key, showVotes) => {
  const { committee, description, vote, voteUrl, date, watchListenUrls, isHighlight, classification } = action
  const { thresholdRequired } = (vote || {})
  return <tr key={key} css={isHighlight ? highlightRow : null}>
    <td css={dateCss}>{dateFormat(parseDate(date))}</td>

    <td>
      <div css={descriptionCss}>
        {description}
      </div>
      {/* <div css={descriptionCss}>
        { classification ? <span>Classification: {classification}</span> : null }
      </div> */}
      {
        // TODO - flesh this out
        (vote && thresholdRequired !== 'simple') ? <div className="note">Supermajority required</div> : null
      }
      {
        (showVotes && vote) ? <VoteBlock vote={vote} voteUrl={voteUrl} /> : null
      }
      {
        // hearing info
        watchListenUrls.length > 0 ?
          <div css={recordingLineCss}>
            {watchListenUrls.map((url, i) => <span><a href={url}>Recording {i + 1}</a> </span>)}
          </div> : null
      }
    </td>
    <td css={committeeCss}>{committee}</td>
  </tr >
}

export default BillActions

const voteUrlCss = css`
  font-style: italic;
  margin-bottom: 0.1em;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
`
const colCss = css`
  display: flex;
  flex-wrap: wrap;
`
const col1 = css`
  flex: 0 0 7em;
`
const col2 = css`
  flex: 1 0 12em;
`
const rowCss = css`
  margin-bottom: 0.6em;
  flex: 0 0 7em;
  margin: 0.2em 0;
`
const totalVoteCss = (color) => css`
  display: inline-block;
  border: 1px solid #473d29;
  border-left: 3px solid  #473d29;
  background-color: ${color};
  padding: 0.2em 0.3em;
`
const partyVoteCss = (color, secondary) => css`
  display: inline-block;
  border: 1px solid #806f47;
  background-color: ${secondary};

  width: 3em;
  padding: 0.2em 0.5em;
`
const partyIconCss = (color) => css`
  display: inline-block;
  border: 1px solid #806f47;
  border-right: none;
  background-color: #e0d4b8;
  color: ${color};
  width: 1em;
  padding: 0.2em 0.2em;
  padding-left: 0.5em;
  font-style: normal;
`

const VoteBlock = ({ vote, voteUrl }) => {
  const {
    count,
    motionPassed,
    gopCount,
    gopSupported,
    demCount,
    demSupported,
  } = (vote || {})
  const rColor = partyColors('R')
  const dColor = partyColors('D')
  const passageColor = motionPassed ? positionColors['Y'] : positionColors['N']
  const gopSupportColor = gopSupported ? positionColors['Y'] : positionColors['N']
  const demSupportColor = demSupported ? positionColors['Y'] : positionColors['N']
  // const lightRed = partyColors('R', 'lighter')
  // const lightBlue = partyColors('D', 'lighter')
  return <div css={voteUrlCss}>
    <div css={[colCss, col1]}>
      <div css={[rowCss]}>
        <a href={voteUrl}>Vote:</a>
        <span> </span>
        <span css={[totalVoteCss(passageColor)]}>{count && count.yes}-{count && count.no}</span>
      </div>
    </div>
    <div css={[colCss, col2]}>
      <div css={[rowCss]}>
        <span css={partyIconCss(rColor)}>R</span>
        <span css={partyVoteCss(rColor, gopSupportColor)}>{gopCount && gopCount.yes}-{gopCount && gopCount.no}</span>
      </div>
      <div css={rowCss}>
        <span css={partyIconCss(dColor)}>D</span>
        <span css={partyVoteCss(dColor, demSupportColor)}>{demCount && demCount.yes}-{demCount && demCount.no}</span>
      </div>
    </div>
  </div>
}