import React from 'react';

import './../config/base.css'
import HousePage from './house';

export default {
  title: 'Pages/House',
  component: HousePage,
};

const Template = (args) => <HousePage {...args} />

export const House = Template.bind({})
House.args = {}