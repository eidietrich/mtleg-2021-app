import React from 'react';

import BillTable from '../components/BillTable';

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

export const OneHundredBill = Template.bind({});
OneHundredBill.args = {
    bills: bills.slice(5,105),
};

export const NoBills = Template.bind({});
NoBills.args = {
    bills: [],
};