import React from 'react';

import './../config/base.css'
import OverviewPage from './index';

// import { bills } from '../data/mtleg-2019.json'

export default {
  title: 'Pages/Overview',
  component: OverviewPage,
};

const Template = (args) => <OverviewPage {...args} />

export const Overview = Template.bind({})
Overview.args = {}