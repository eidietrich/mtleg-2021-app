import React from 'react';

import LinksList from '../components/LinksList'

/*
Data structure:
{
  articles {
    title
    date
    url
    displayClass (TK - for featuring articles)
  }
}

*/

const LawmakerCoverage = ({articles}) => {
  return <div>
      <h3>Media coverage</h3>
      <div>MTFP stories about the bill</div>
      <LinksList links={articles} featuredFilter={d => false}/>
  </div>
};

export default LawmakerCoverage