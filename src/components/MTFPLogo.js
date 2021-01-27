import React from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { css } from '@emotion/react'

const containerCss = css`
    /* width: 100px; */
    display: inline-block;
    position: relative;

    text-transform: uppercase;
    font-style: normal;
    font-weight: bold;

    a {
        color: #AE9864;
    }
    
`
const imgCss = css`
    position: relative;
    top: 5px;
    margin: 0 5px;

    :hover {
      opacity: 0.7;
    }
`

const MTFPLogo = (props) => (
  <StaticQuery
    query={graphql`
      query {
        image: file(relativePath: { eq: "mtfp-logo.png" }) {
          childImageSharp {
            fixed(width: 50) {
              ...GatsbyImageSharpFixed_noBase64
            }
          }
        }
      }
    `}
    render={data => {
        return <div css={containerCss}>
            <a href="https://montanafreepress.org">
            <Img
                css={imgCss}
                fixed={data.image.childImageSharp.fixed}
                alt='MTFP logo'
                width='auto'
            />
            </a>
        </div>}}
  />
)
export default MTFPLogo