import React from 'react';

import './../config/base.css'
import GovernorPage from './index';

export default {
  title: 'Pages/Governor',
  component: GovernorPage,
};

const Template = (args) => <GovernorPage {...args} />

export const Governor = Template.bind({})
Governor.args = {}