import React from 'react';
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

import { css } from '@emotion/react'
const portraitCss = css`
  background-color: #666;
  width: 100px;
  height: 100px;
`

const LawmakerPortrait = ({portrait}) => {
  return <div css={portraitCss}>
      {portrait && <Img fixed={portrait.childImageSharp.fixed} width={100}/>}
    </div>
  // return <Test />

    // return <div css={portrait}>{imageSlug}</div>
};
export default LawmakerPortrait