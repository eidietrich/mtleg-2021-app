import React from 'react';

import LawmakerInline from './LawmakerInline';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Components/LawmakerInline',
  component: LawmakerInline,
};

const Template = (args) => <p>
    Text before before before: <LawmakerInline {...args} /> Text after after after.
</p>

export const RepLlewJones = Template.bind({});
RepLlewJones.args = {
    lawmaker: lawmakers.find(d => d.name === "Llew Jones")
};

export const RepMaryCaferro = Template.bind({});
RepMaryCaferro.args = {
    lawmaker: lawmakers.find(d => d.name === "Mary Caferro")
};