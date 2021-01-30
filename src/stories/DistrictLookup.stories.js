import React from 'react';

import DistrictLookup from '../components/input/DistrictLookup';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Inputs/DistrictLookup',
  component: DistrictLookup,
};

const Template = (args) => <DistrictLookup {...args} />;

export const Default = Template.bind({});
Default.args = {
  lawmakers
};