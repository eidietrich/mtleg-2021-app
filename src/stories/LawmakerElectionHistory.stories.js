import React from 'react';

import LawmakerElectionHistory from '../components/lawmaker/ElectionHistory';

import lawmakers from '../data/lawmakers.json'

export default {
  title: 'Lawmaker/ElectionHistory',
  component: LawmakerElectionHistory,
};

const Template = (args) => <div>
    <h3>Showing {args.lawmaker.name} - {args.lawmaker.district.key}</h3>
    <LawmakerElectionHistory {...args} />
</div>

export const GOPRepresentative = Template.bind({});
GOPRepresentative.args = {
    lawmaker: lawmakers.find(d => d.name === 'Paul Fielder')
};

export const DemRepresentative = Template.bind({});
DemRepresentative.args = {
    lawmaker: lawmakers.find(d => d.name === 'Mary Caferro')
};
export const LongName = Template.bind({});
LongName.args = {
    lawmaker: lawmakers.find(d => d.name === 'Emma Kerr-Carpenter')
};

export const InCycleSenator = Template.bind({});
InCycleSenator.args = {
    lawmaker: lawmakers.find(d => d.name === 'Ed Buttrey')
};

export const OutOfCycleSenator = Template.bind({});
OutOfCycleSenator.args = {
    lawmaker: lawmakers.find(d => d.name === 'Bryce Bennett')
};



export const AppointedSenator = Template.bind({});
AppointedSenator.args = {
    lawmaker: lawmakers.find(d => d.name === 'Shane Morigeau')
};
