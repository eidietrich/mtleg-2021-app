import React from 'react';
import './../config/base.css'

import BillInfo from './BillInfo';

export default {
  title: 'Compositions/Bill Info',
  component: BillInfo,
};

const Template = (args) => <BillInfo {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {
  identifier: 'HB XX',
  title: 'Generally revise state statute',
  status: 'TK',
  sponsor: 'Llew Jones',
  lawsUrl: 'https://example.com',
  textUrl: null,
  fiscalNoteUrl: null,
  legalNoteUrl: null,
}
