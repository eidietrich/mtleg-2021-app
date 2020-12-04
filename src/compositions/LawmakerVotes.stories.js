import React from 'react';
import './../config/base.css'

import LawmakerVotes from './LawmakerVotes';

export default {
  title: 'Compositions/Lawmaker Votes',
  component: LawmakerVotes,
};

const Template = (args) => <LawmakerVotes {...args} />
// const Template = (args) => <div>XXX</div>

export const Default = Template.bind({})
Default.args = {
  lastName: 'SmithXX',
  votes: [
    {
      identifier: 'HB 2',
      title: 'State budget bill',
      isMajor: true,
      lawmakerVote: 'Y',
      voteOutcome: '38-22',
      voteGopCaucus: '14-22',
      voteDemCaucus: '24-0',
    },
    {
      identifier: 'HB 4',
      title: 'Budget budget nope',
      isMajor: true,
      lawmakerVote: 'Y',
      voteOutcome: '38-22',
      voteGopCaucus: '14-22',
      voteDemCaucus: '24-0',
    },
    {
      identifier: 'HB 45',
      title: 'This makes a law',
      isMajor: true,
      lawmakerVote: 'N',
      voteOutcome: '38-22',
      voteGopCaucus: '14-22',
      voteDemCaucus: '24-0',
    },

    
  ]
}
