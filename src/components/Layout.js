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

// import text from '../data/app-copy.json'

import "../config/base.css"

const bodyStyles = css`
    
`
const contentStyle = css`
    /* border: 1px solid red; */
    padding: 10px;
    max-width: 800px;
    margin: auto;

    font-family: Arial, Helvetica, sans-serif;
`
const titleStyle = css`
  color: #444;
  font-size: 1.1em;
  margin-bottom: 0.3em;
`

const Layout = ({ children }) => {
  return (
    <div css={bodyStyles}>
      <Header />
      <div css={contentStyle}>
        <h2 css={titleStyle}>Montana's 2021 Legislature: The MTFP guide</h2>
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
