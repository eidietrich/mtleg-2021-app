import React from 'react';
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import { partyColors } from '../config/config'

import { lawmakerUrl } from '../config/utils'
import { locale } from 'moment';

const spanStyle = css`
  
`
const tag = css`
  border: 1px solid #ddd;
  font-size: 0.8em;
  line-height: 1em;
  margin-right: 0.5em;
  display: inline-block;
`
const tagParty = css`
  color: white;
  padding: 0.25em 0.5em;
  display: inline-block;
  
`
const tagDistrict = css`
  /* font-family: Arial, Helvetica, sans-serif; */
  
  font-weight: bold; 
  padding: 0 0.25em;
  color: #444;
  
  
`
const residenceCss = css`
  /* font-size: 0.8em; */
`

const LawmakerInline = ({lawmaker}) => {
  const { name, party, district, locale } = lawmaker
  const partyColor = partyColors(party)
  const tagPartyStyle = css`
    border: 1px solid ${partyColor};
  `
  const tagPartyPartySyle = css`
    background-color: ${partyColor};
  `
  return <Link css={spanStyle} to={`/lawmakers/${lawmakerUrl(name)}`}>
    <span>{name} </span>
    <span css={[tag, tagPartyStyle]}>
      <span css={[tagParty, tagPartyPartySyle]}>{party}</span>
      <span css={tagDistrict}>{district.key}</span>
      
    </span>
    <span css={residenceCss}>({locale.short})</span>
  </Link>
};

export default LawmakerInline