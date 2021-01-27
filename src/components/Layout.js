/**
 * Standard page wrapper component
 *  
 * Queries for data with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
// import { Link, useStaticQuery, graphql } from 'gatsby'
import { css } from '@emotion/react'
// import Img from "gatsby-image"


import Header from './Header'
import Nav from './Nav'
import Footer from './Footer'
import MTFPLogoWide from './MTFPLogo'

import { updateTime } from '../data/summary.json'
import { formatTimeLong } from '../config/utils'


import "../config/base.css"

const bodyStyles = css`
    position: relative;
`
const headerStyle = css`  
  background-color: #171818;
  margin-bottom: 10px;
  padding: 1em;

  /* width: 99vw; */
  /* position: relative;
  left: 50%;
  right: 50%; */
  /* margin-left: -50vw;
  margin-right: -50vw; */
  /* margin-bottom: 300px; */
`
const contentStyle = css`
    /* border: 1px solid red; */
    padding: 10px;
    padding-top: 0;
    max-width: 800px;
    margin: auto;
    
`
const titleStyle = css`
  color: #AE9864;
  font-size: 3em;
  margin-bottom: 5px;
  margin-top: 0;
  text-transform: uppercase;
  text-align: center;

  @media screen and (max-width: 468px) {
    font-size: 2em;

  }
`
const subtitleStyle = css`
  color: #806f47;
  font-size: 1.15em;
  text-align: center;
  /* font-style: italic; */
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 5px;
`
const mtfpBlurbCss = css`
  text-align: center;
  color: #ddd;
  font-style: italic;
`
const updateCss = css`
  color: #444;
  font-size: 0.9em;
  margin-bottom: 0.5em;
  text-align: right;
  /* text-transform: uppercase; */
`

const navCss = css`
  position: sticky;
  top: 0px;
  background-color: white;
  margin: -10px;
  padding: 10px;
  margin-bottom: 0;
  padding-bottom: 0;
  z-index: 1000;
`

const headerDonateLink = "https://checkout.fundjournalism.org/memberform?org_id=montanafreepress&campaign=7014o000000JNaKAAW"

const Layout = ({ children }) => {
  return (
    <div css={bodyStyles}>
      {/* <Header /> */}
      <div css={contentStyle}>
        <div css={headerStyle}>
          <h1 css={titleStyle}>Capitol Tracker</h1>
          <h2 css={subtitleStyle}>Exploring the data on Montana's 2021 legislative session</h2>
          <div css={mtfpBlurbCss}>A digital guide by <MTFPLogoWide />| <a href={headerDonateLink}>Support this work</a></div>
          
        </div>
        <div css={navCss}>
        <Nav />
        </div>
        
        <div css={updateCss}>Last updated {formatTimeLong(new Date(updateTime))}</div>
        <main>{children}</main>
      </div>
      <Footer />
      
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
