import React, { Component } from 'react';
import { css } from '@emotion/react'

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


class VoteBlock extends Component {
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
    const { actions } = this.props
    const { showMinorActions, showVotes } = this.state
    const voteActions = actions.filter(d => d.vote)
    const houseVotes = voteActions.filter(d => d.chamber === 'House')
    const houseFloorVotes = houseVotes.filter(d => d.chamber === 'House Floor')
    const houseCommitteeVotes = houseVotes.filter(d => d.chamber !== 'House Floor')
    
    console.log(houseVotes)
    return<div>
      <h3>Votes</h3>
      <Vote action={houseCommitteeVotes.slice(-1)[0]}/>
    </div>
  }
}

export default VoteBlock

const Vote = (props) => {
  const { action } = props
  const { vote, description } = action
  // const { action } = vote
  // const gopVotes = 
  return <div>
    <h4>{description}</h4>
  </div>
}