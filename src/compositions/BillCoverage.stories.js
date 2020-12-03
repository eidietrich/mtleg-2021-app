import React from 'react';
import './../config/base.css'

import BillCoverage from './BillCoverage';

export default {
  title: 'Compositions/Bill Coverage',
  component: BillCoverage,
};

const Template = (args) => <BillCoverage {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
