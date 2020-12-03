import React from 'react';
import './../config/base.css'

import OverviewVotingPatterns from './OverviewVotingPatterns';

export default {
  title: 'Compositions/Overviewpage Voting Patterns',
  component: OverviewVotingPatterns,
};

const Template = (args) => <OverviewVotingPatterns {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
