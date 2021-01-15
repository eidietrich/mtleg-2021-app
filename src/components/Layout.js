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

import { updateTime } from '../data/summary.json'
import { formatTime } from '../config/utils'


import "../config/base.css"

const bodyStyles = css`
    
`
const contentStyle = css`
    /* border: 1px solid red; */
    padding: 10px;
    max-width: 800px;
    margin: auto;
`
const titleStyle = css`
  color: #806f47;
  font-size: 1.1em;
  margin-bottom: 0.3em;
  text-transform: uppercase;
`

const Layout = ({ children }) => {
  return (
    <div css={bodyStyles}>
      <Header />
      <div css={contentStyle}>
        <h2 css={titleStyle}>Statehouse guide: Montana's 2021 Legislative Session</h2>
        <div>Last update: {formatTime(new Date(updateTime))}</div>
        <Nav />
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
