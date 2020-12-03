import React from 'react';

import './../config/base.css'
import SenatePage from './senate';

export default {
  title: 'Pages/Senate',
  component: SenatePage,
};

const Template = (args) => <SenatePage {...args} />

export const Senate = Template.bind({})
Senate.args = {}