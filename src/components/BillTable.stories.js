import React from 'react';

import BillTable from './BillTable';

import bills from '../data/bills.json'

export default {
  title: 'Components/BillTable',
  component: BillTable,
};

const Template = (args) => <div>
  <BillTable {...args} />
</div>

export const FiveBills = Template.bind({});
FiveBills.args = {
    bills: bills.slice(100,105),
};

export const AllBills = Template.bind({});
AllBills.args = {
    bills: bills,
};

export const NoBills = Template.bind({});
NoBills.args = {
    bills: [],
};