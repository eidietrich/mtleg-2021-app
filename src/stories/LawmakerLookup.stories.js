import React from 'react';

import LawmakerLookup from '../components/input/LawmakerLookup';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Inputs/LawmakerLookup',
  component: LawmakerLookup,
};

const Template = (args) => <LawmakerLookup {...args} /> 

export const Default = Template.bind({});
Default.args = {
    lawmakers
}