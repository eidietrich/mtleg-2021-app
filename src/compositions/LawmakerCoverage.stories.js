import React from 'react';
import './../config/base.css'

import LawmakerCoverage from './LawmakerCoverage';

export default {
  title: 'Compositions/Lawmaker Coverage',
  component: LawmakerCoverage,
};

const Template = (args) => <LawmakerCoverage {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
