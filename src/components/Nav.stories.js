import React from 'react';

import Nav from './Nav';

export default {
  title: 'Components/NavBar',
  component: Nav,
};

const Template = (args) => <Nav {...args} />;

export const Default = Template.bind({});
Default.args = {};