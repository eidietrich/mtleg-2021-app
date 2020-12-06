import React from 'react';

import './../config/base.css'
import LawmakerPage from './lawmaker';

import { lawmakers } from '../data/lawmakers.json'

export default {
  title: 'Pages/Single lawmaker',
  component: LawmakerPage,
};

const Template = (args) => <LawmakerPage {...args} />
console.log(lawmakers.find(d => d.name === "Llew Jones"))
export const LlewJones = Template.bind({})
LlewJones.args = {
  pageContext: {
    key: 'Llew-Jones',
    lawmaker: lawmakers.find(d => d.name === "Llew Jones"),
  }
}

export const MaryCaferro = Template.bind({})
MaryCaferro.args = {
  pageContext: {
    key: 'Mary-Caferro',
    lawmaker: lawmakers.find(d => d.name === "Mary Caferro"),
  }
}

// Add stories for different types of lawmakers - parties, leadership roles etc.