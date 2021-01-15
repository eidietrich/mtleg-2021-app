import React from 'react';

import './../config/base.css'
import LawmakerPage from './lawmaker';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Pages/Lawmaker pages',
  component: LawmakerPage,
};

const Template = (args) => <LawmakerPage {...args} />
export const RepLlewJones = Template.bind({})
RepLlewJones.args = {
  pageContext: {
    key: 'Llew-Jones',
    lawmaker: lawmakers.find(d => d.name === "Llew Jones"),
  }
}

export const RepMaryCaferro = Template.bind({})
RepMaryCaferro.args = {
  pageContext: {
    key: 'Mary-Caferro',
    lawmaker: lawmakers.find(d => d.name === "Mary Caferro"),
  }
}

// Add stories for different types of lawmakers - parties, leadership roles etc.