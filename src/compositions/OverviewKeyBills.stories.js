import React from 'react';
import './../config/base.css'

import OverviewKeyBills from './OverviewKeyBills';

export default {
  title: 'Compositions/Overview Key Bills',
  component: OverviewKeyBills,
};

const Template = (args) => <OverviewKeyBills {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
