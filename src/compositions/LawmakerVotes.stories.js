import React from 'react';
import './../config/base.css'

import LawmakerVotes from './LawmakerVotes';

export default {
  title: 'Compositions/Lawmaker Votes',
  component: LawmakerVotes,
};

const Template = (args) => <LawmakerVotes {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {}
