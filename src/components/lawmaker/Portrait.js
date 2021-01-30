import React from 'react';
import Img from "gatsby-image"

const LawmakerPortrait = ({portrait}) => {
  return <div>
      {portrait && <Img fixed={portrait.childImageSharp.fixed} width={100}/>}
    </div>
};
export default LawmakerPortrait