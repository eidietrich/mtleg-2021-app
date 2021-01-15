import React from 'react';

import DistrictLookup from './DistrictLookup';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Compositions/DistrictLookup',
  component: DistrictLookup,
};

const Template = (args) => <DistrictLookup {...args} />;

export const Default = Template.bind({});
Default.args = {
  lawmakers
};