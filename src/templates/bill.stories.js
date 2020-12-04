import React from 'react';

import './../config/base.css'
import BillPage from './bill';

import { bills } from '../data/bills.json'
// TODO: Work data merge into processing step (avoid redundancy w/ gatsby-node)

export default {
  title: 'Pages/Single bill',
  component: BillPage,
};

const Template = (args) => <BillPage {...args} />

export const HB658 = Template.bind({})
HB658.args = {
  pageContext: {
    key: 'HB-658',
    bill: bills.find(d => d.identifier === "HB 658"),
  }
}

export const HB2 = Template.bind({})
HB2.args = {
  pageContext: {
    key: 'HB-2',
    bill: bills.find(d => d.identifier === "HB 2"),
  }
}

// TODO: Add stories for senate bills, other budget bills, resultions etc.