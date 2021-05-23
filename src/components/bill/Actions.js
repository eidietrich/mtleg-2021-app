import React, { Component, useState } from 'react';
import { css } from '@emotion/react'

import InfoPopup from '../InfoPopup'

import { infoPopups } from '../../data/summary.json'

import {
  dateFormat,
  parseDate
} from '../../config/utils'

import {
  tableStyle
} from '../../config/styles'

import {
  partyColors,
  positionColors
} from '../../config/config'

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
  vertical-align: top;
`
const dateColWidth = css`
  width: 5em;
  @media screen and (max-width: 468px) {
    width: 4em;
  }
`
const actionCss = css`
  vertical-align: top;
`
const actionWidth = css`
  width: 35em;
  @media screen and (max-width: 760px) {
    width: 25em;
  }
  @media screen and (max-width: 600px) {
    width: 20em;
  }
  @media screen and (max-width: 468px) {
    width: 16em;
  }
`

const committeeCss = css`
  font-style: italic;
  vertical-align: top;
`
const committeeColWidth = css`
  width: 10em;
  @media screen and (max-width: 468px) {
    width: 5em;
  }
`
const highlightRow = css`
  background-color: #cebc9f;
`

const inlineButtonCss = css`
  display: inline-block;
  border: none;
  padding: 0.2em 0.5em;
  border: 1px solid var(--tan6);
  /* color: #ce5a00; */
  color: var(--tan6);
  background-color: rgba(256, 256, 256, 0);
  text-align: left;
  font-size: 1em;
  text-transform: none;
  letter-spacing: normal;
  font-weight: normal;

  :hover {
    background-color: rgba(256, 256, 256, 0);
    border: 1px solid #ce5a00;
    color: #ce5a00;
    text-decoration: none;
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
    const { actions, lawsUrl, vetoMemoUrl } = this.props
    const { showMinorActions, showVotes } = this.state
    const actionFilter = showMinorActions ? d => true : d => d.isMajor
    const annotations = [
      {
        key: 'vetoMemo',
        descriptionFilter: (action => ['Vetoed by Governor', 'Returned with Governor\'s Line-item Veto'].includes(action.description)),
        label: action => 'Veto memo',
        url: action => vetoMemoUrl
      }
    ]
    const rows = actions
      .filter(actionFilter)
      .map((d, i) => Action(d, String(i), showVotes, annotations))
    return <div>
      <h3>Legislative actions</h3>
      <InfoPopup info={infoPopups.find(d => d.key === 'bill-process')} />
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
      <div className="note">This table may omit bill actions recorded since this guide's last update. See the <a href={lawsUrl}>bill page in LAWS</a> for an official reference.</div>

    </div >
  }
}
const Action = (action, key, showVotes, annotations) => {
  const { committee, description, vote, voteUrl, date, watchListenUrls, isHighlight,
    //  classification
  } = action
  const { thresholdRequired } = (vote || {})
  return <tr key={key} css={isHighlight ? highlightRow : null}>
    <td css={dateCss}><div css={dateColWidth}>
      {dateFormat(parseDate(date))}
    </div></td>

    <td css={actionCss}><div css={actionWidth}>
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
            {watchListenUrls.map((url, i) => <span><a href={url}>Recording {i + 1}.</a> </span>)}
          </div> : null
      }
      {
        // veto memo text and other custom annotations
        annotations.filter(a => a.descriptionFilter(action)).map(annot => {
          if (annot.url(action)) {
            return <a href={annot.url(action)}>{annot.label(action)}</a>
          } else {
            return <span>{annot.label(action)}</span>
          }
        })
      }
    </div></td>
    <td css={committeeCss}><div css={committeeColWidth}>{committee}</div></td>
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
    votes
  } = (vote || {})
  const rColor = partyColors('R')
  const dColor = partyColors('D')
  const passageColor = motionPassed ? positionColors('Y') : positionColors('N')
  const gopSupportColor = gopSupported ? positionColors('Y') : positionColors('N')
  const demSupportColor = demSupported ? positionColors('Y') : positionColors('N')
  // const lightRed = partyColors('R', 'lighter')
  // const lightBlue = partyColors('D', 'lighter')
  return <div>
    <div css={voteUrlCss}>
      <div css={[colCss, col1]}>
        <div css={[rowCss]}>
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
    <VoteListing votes={votes} voteUrl={voteUrl} />
  </div>
}

const voteListing = css`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid var(--tan5);
  padding: 0.5em;
  background-color: var(--tan2);
  margin-bottom: 1em;
  margin-top: 0.5em;
`
const col = css`
  flex: 0 0 50%;
`
const partyLabel = css`
  font-weight: bold;
  text-transform: uppercase;
  color: var(--gray6);
  margin-bottom: 0.3em;
  margin-top: 0.2em;
`
const partyVotes = css`
  margin-bottom: 1em;
`

const VoteListing = ({ votes, voteUrl, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const gopVotes = votes.filter(d => d.party === 'R')
  const demVotes = votes.filter(d => d.party === 'D')
  return <div>
    <button css={[inlineButtonCss]} onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? <span>&#x25BE; Hide full vote breakdown</span> : <span>&#x25B8; Show full vote breakdown</span>}
    </button>
    {/* <span>  <a href={voteUrl}>Official vote page.</a></span> */}
    {
      isOpen ?
        <div css={voteListing}>
          <div css={col}>
            <div css={partyLabel}>Republicans</div>
            <div css={partyVotes}>
              {
                gopVotes.map(VoteItem)
              }
            </div>
          </div>
          <div css={col}>
            <div css={partyLabel}>Democrats</div>
            <div css={partyVotes}>
              {
                demVotes.map(VoteItem)
              }
            </div>
          </div>
        </div> : null
    }
    {
      isOpen ?
        <button css={inlineButtonCss} onClick={() => setIsOpen(false)}>
          Hide full vote breakdown
        </button> : null
    }

  </div>
}

const voteItemCss = css`
  display: flex;

  :nth-of-type(5n) {
    margin-bottom: 0.5em;
  }
`
const voteIndicator = css`
  width: 2em;
  margin-right: 0.5em;
  text-align: center;
  padding: 0.1em;
  border-top: 1px solid var(--tan6);
  text-transform: capitalize;
`
const nameLine = css`
  width: 13em;
  padding: 0.1em;
`

const VoteItem = (vote) => {
  const { option, name, city, party } = vote
  const choice = option.replace('absent', 'abs').replace('excused', 'exc')
  const locale = city.replace(' ', '\u00a0') // prevents line break on space
  const voteColor = css`
    background-color: ${positionColors(choice.toUpperCase()[0])};
  `
  const nameColor = css`
    color: ${partyColors(party, 'darker')};
  `
  return <div key={name} css={voteItemCss}>
    <div css={[voteIndicator, voteColor]}>{choice}</div>
    <div css={nameLine}>
      <strong css={nameColor}>{name}</strong> (<em>{locale}</em>)
    </div>
  </div>
}