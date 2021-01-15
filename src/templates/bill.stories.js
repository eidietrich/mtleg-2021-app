import React from 'react';

import './../config/base.css'
import BillPage from './bill';

import bills from '../data/bills.json'

export default {
  title: 'Pages/Bill page',
  component: BillPage,
};

const Template = (args) => <BillPage {...args} />

export const HB658 = Template.bind({})
HB658.args = {
  pageContext: {
    key: 'HB-658',
    bill: bills.find(d => d.identifier === "HB 658"),
    sponsor: {
      title: 'Rep.',
      name: 'Ed Buttrey',
      key: 'Ed-Buttrey',
      district: 'HD 21',
      party: 'R',
      residence: 'Great Falls'
    }
  }
}

export const BondingBill = Template.bind({})
BondingBill.args = {
  pageContext: {
    key: 'HB-652',
    bill: bills.find(d => d.identifier === "HB 652"),
    sponsor: {
      title: 'Rep.',
      name: 'Mike Hopkins',
      key: 'Mike-Hopkins',
      district: 'HD 92',
      party: 'R',
      residence: 'Missoula'
    }
  }
}

export const BudgetBill = Template.bind({})
BudgetBill.args = {
  pageContext: {
    key: 'HB-2',
    bill: bills.find(d => d.identifier === "HB 2"),
    sponsor: {
      title: 'Rep.',
      name: 'Nancy Ballance',
      key: 'Nancy-Ballance',
      district: 'HD XX',
      party: 'R',
      residence: 'Hamilton'
    }
  }
}

// TODO: Add stories for senate bills, other budget bills, resultions etc.