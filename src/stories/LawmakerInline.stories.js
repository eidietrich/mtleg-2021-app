import React from 'react';

import LawmakerInline from '../components/LawmakerInline';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Lawmaker/InlineName',
  component: LawmakerInline,
};

const Template = (args) => <div>
    Text before before before: <LawmakerInline {...args} /> Text after after after.
</div>

export const RepLlewJones = Template.bind({});
RepLlewJones.args = {
    lawmaker: lawmakers.find(d => d.name === "Llew Jones")
};

export const RepMaryCaferro = Template.bind({});
RepMaryCaferro.args = {
    lawmaker: lawmakers.find(d => d.name === "Mary Caferro")
};