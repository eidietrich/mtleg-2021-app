import React from 'react';
import './../config/base.css'

import LawmakerBills from './LawmakerBills';

export default {
  title: 'Compositions/Lawmaker Bills',
  component: LawmakerBills,
};

const Template = (args) => <LawmakerBills {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {
  bills: [
    {
      identifier: 'HB 2',
      title: 'Long-Range Building Appropriations',
      status: 'TK',
    },
    {
      identifier: 'HB 345',
      title: 'Provide for film tax credits',
      status: 'TK',
    },
    {
      identifier: 'HB 456',
      title: 'Establish legislative audit special revenue account for specialist services',
      status: 'TK',
    },
    {
      identifier: 'HB 342',
      title: 'Revise taxation of social security income',
      status: 'TK',
    }
  ]
}
