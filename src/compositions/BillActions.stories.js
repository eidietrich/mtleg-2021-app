import React from 'react';
import './../config/base.css'

import BillActions from './BillActions';

import bills from '../data/bills.json'

export default {
  title: 'Compositions/Bill Actions',
  component: BillActions,
};

const Template = ({defaultShowMinorActions, action, billIndex}) => {
  // const bill = bills[billIndex]
  const billsWithAction = bills.filter(b => b.actions.map(d => d.description).includes(action))
  console.log(`"${action}" found in ${billsWithAction.length} bills`)
  const bill = billsWithAction[billIndex]
  console.log(`Shown: ${bill.identifier}: ${bill.title}`)
  const defaultState = {
    showMinorActions: defaultShowMinorActions,
    showVotes: false,
  }
  return <BillActions actions={bill.actions} defaultState={defaultState}/>
}

export const Default = Template.bind({})
Default.args = {
  defaultShowMinorActions: false,
  action: 'Introduced',
  billIndex: 0,
  // defaultState: {
  //   showMinorActions: false,
  // },
  // actions: bills[0].actions,
}
