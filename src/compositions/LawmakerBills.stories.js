import React from 'react';
import './../config/base.css'

import LawmakerBills from './LawmakerBills';

export default {
  title: 'Compositions/Lawmaker Bills',
  component: LawmakerBills,
};

const Template = (args) => <LawmakerBills {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
