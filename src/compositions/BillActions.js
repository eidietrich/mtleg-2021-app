import React, { Component } from 'react';

import {
  dateFormat,
  parseDate
} from '../config/utils'

import {
  tableStyle
} from '../config/styles'

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

// const BillActions = (props) => <div>Test</div>

const defaultState = {
  showMinorActions: false
}

class BillActions extends Component {
  constructor(props) { 
    super(props)
    this.state = {...(props.defaultState || defaultState)}

    this.toggleShowMinorActions = this.toggleShowMinorActions.bind(this)
  }

  toggleShowMinorActions() {
    this.setState({
      showMinorActions: !this.state.showMinorActions
    })
  }

  render() {
    const { actions } = this.props
    const { showMinorActions } = this.state
    const actionFilter = showMinorActions ? d => true : d => d.isMajor
    const rows = actions
      .filter(actionFilter)
      .map((d, i) => Action(d, String(i)))

    return <div>
        <h3>Progress through the legislature</h3>
        <table css={tableStyle}>
            <thead className="tableHeader">
              <tr>
                {/* <th>Symbol</th> */}
                <th>Date</th>
                <th>Body</th>
                <th>Action</th>
                
                <th>Vote</th>
                <th>GOP</th>
                <th>Dem.</th>
              </tr>
            </thead>
            <tbody>
              {rows}
            </tbody>
        </table>
        <div>{
          showMinorActions ?
            'Showing all recorded bill actions' 
            : 'Showing major bill actions only'
        }</div>
        <button onClick={this.toggleShowMinorActions}>{
          showMinorActions ?
            'See fewer' 
            : 'See more'
        }</button>
        
    </div>
  }
}
const Action = (action, key) => {
  return <tr key={key}>
    <td>{dateFormat(parseDate(action.date))}</td>
    <td>{action.committee}</td>
    <td>{action.description}</td> 
    <td>{action.vote}</td>
    <td></td>
    <td></td>
  </tr>
}

export default BillActions