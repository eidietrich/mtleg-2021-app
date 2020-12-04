import React from 'react';
import './../config/base.css'

import LawmakerInfo from './LawmakerInfo';

export default {
  title: 'Compositions/Lawmaker Info',
  component: LawmakerInfo,
};

const Template = (args) => <LawmakerInfo {...args} />

export const Default = Template.bind({})
Default.args = {
  name: 'Mary Caferro',
  party: 'D',
  district: 'HD ',
  residence: 'Helena',
  roles: 'TK',
  history: 'TK',
}
