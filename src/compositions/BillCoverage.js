import React from 'react';
import PropTypes from "prop-types"

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

const BillCoverage = ({articles}) => {
  return <div>
      <h3>Media coverage</h3>
      <div>MTFP stories about the bill</div>
      <LinksList links={articles} featuredFilter={d => false}/>
  </div>
};

BillCoverage.propTypes = {
  articles: PropTypes.array.isRequired,
}

export default BillCoverage

