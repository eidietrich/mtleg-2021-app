import React from 'react';

import LawmakerLookup from './LawmakerLookup';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Compositions/LawmakerLookup',
  component: LawmakerLookup,
};

const Template = (args) => <LawmakerLookup {...args} /> 

export const Default = Template.bind({});
Default.args = {
    lawmakers
}