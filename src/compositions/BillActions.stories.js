import React from 'react';
import './../config/base.css'

import BillActions from './BillActions';

export default {
  title: 'Compositions/Bill Actions',
  component: BillActions,
};

const Template = (args) => <BillActions {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
