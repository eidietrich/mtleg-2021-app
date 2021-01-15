import React from 'react';

import BillLookup from './BillLookup';

// import bills from '../data/bills.json'

export default {
  title: 'Compositions/BillLookup',
  component: BillLookup,
};

const Template = (args) => <BillLookup {...args} /> 

export const Default = Template.bind({});
Default.args = {
    bills: [
        {key: 'HB-2', identifier: 'HB 2', title: 'General appropriations act'},
        {key: 'HB-3', identifier: 'HB 23', title: 'General extortion act'},
        {key: 'HB-24', identifier: 'HB 24', title: 'XXXX Make law stuff'},
        {key: 'SB-25', identifier: 'SB 25', title: 'Mandate mask usage'}

    ]
}