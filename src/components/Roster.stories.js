import React from 'react';

import Roster from './Roster';

import lawmakers from '../data/lawmakers.json'
const rosterLawmakers = lawmakers.slice(0,10)

export default {
  title: 'Components/Roster',
  component: Roster,
};

const Template = (args) => <Roster {...args} />

export const Default = Template.bind({});
Default.args = {
    title: '10 lawmakers in a roster',
    lawmakers: rosterLawmakers
};
