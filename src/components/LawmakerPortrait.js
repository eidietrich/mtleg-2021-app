import React from 'react';
import Img from "gatsby-image"
import { css } from '@emotion/react'
const portraitCss = css`
  background-color: #666;
`

const LawmakerPortrait = ({portrait}) => {
  return <div>
      {portrait && <Img fixed={portrait.childImageSharp.fixed} width={100}/>}
    </div>
};
export default LawmakerPortrait