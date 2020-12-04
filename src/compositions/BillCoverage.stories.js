import React from 'react';
import './../config/base.css'

import BillCoverage from './BillCoverage';

export default {
  title: 'Compositions/Bill Coverage',
  component: BillCoverage,
};

const Template = (args) => <BillCoverage {...args} />

export const Default = Template.bind({})
Default.args = {
  articles: [
    {
      title: 'This bill is great, sponsor says',
      date: new Date('12/3/2020'),
      url: 'https://example.com',
      displayClass: null,
    },
    {
      title: 'This bill is awful, chairman says',
      date: new Date('12/4/2020'),
      url: 'https://example.com',
      displayClass: null,
    },
    {
      title: 'This bill is great, sponsor says',
      date: new Date('12/3/2020'),
      url: 'https://example.com',
      displayClass: null,
    },
    {
      title: 'This bill is awful, chairman says',
      date: new Date('12/4/2020'),
      url: 'https://example.com',
      displayClass: null,
    },
    {
      title: 'This bill is going to die',
      date: new Date('12/2/2020'),
      url: 'https://example.com',
      displayClass: null,
    },
    {
      title: 'This bill will change your life',
      date: new Date('12/1/2020'),
      url: 'https://example.com',
      displayClass: null,
    }
  ]
}
