import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

import { AnchorLink } from "gatsby-plugin-anchor-links";

const navStyle = css`
    border-bottom: 1px solid #ae9864;
    margin-bottom: 0.5em;
    
`
const navRowStyle = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
`
const navRowPrimary = css`
    margin: 0 -0.25em; /* Aligns items to edges*/
`
const navRowSecondary = css`
    justify-content: space-between;
    margin-left: -0.5em;
    margin-right: -0.5em;
`

const navItemStyle = css`
    
    
    margin: 0 0.25em;
    margin-bottom: 0.5rem;

    text-align: center;
    text-decoration: none;
    
    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`
const navPrimaryStyle = css`
    flex: 1 1 4em;
    padding: 0.2em;
    border: 1px solid #bbb;
    box-shadow: 1px 1px 2px #ddd;
    display: flex;
    flex-direction: column;

    :hover {
        border: 1px solid #ce5a00;
        text-decoration: none;
    }
`
const navPrimaryTitle = css`
    font-weight: bold;
    text-transform: uppercase;
`
const navPrimaryInfo = css`
    color: #666;
    font-size: 0.9em;
`
const navSecondaryStyle = css`
    display: block;
    max-width: 12em;
    margin: 0.25em 0.5em;
`

const Nav = (props) => <div css={navStyle}>
    <div css={[navRowStyle, navRowPrimary]}>
        <Link css={[navItemStyle, navPrimaryStyle]} to='/house'>
            <div css={navPrimaryTitle}>House </div>
            <div css={navPrimaryInfo}>GOP-held 67-33</div>
        </Link>
        <Link css={[navItemStyle, navPrimaryStyle]} to='/senate'>
            <div css={navPrimaryTitle}>Senate</div>
            <div css={navPrimaryInfo}>GOP-held 31-19</div>
        </Link>
        <Link css={[navItemStyle, navPrimaryStyle]} to='/governor'>
            <div css={navPrimaryTitle}>Gov.</div>
            <div css={navPrimaryInfo}>Greg Gianforte (R)</div>
        </Link>
    </div>
    <div css={[navRowStyle, navRowSecondary]}>
        <Link css={[navItemStyle, navSecondaryStyle]} to='/'>Overview</Link>
        {/* <Link css={[navItemStyle, navSecondaryStyle]} to='/'>Key bills</Link> */}
        <AnchorLink css={[navItemStyle, navSecondaryStyle]} to='/#key-bill-status'>Key bills</AnchorLink>
        <AnchorLink css={[navItemStyle, navSecondaryStyle]} to='/#find-bill'>Find a bill</AnchorLink>
        <AnchorLink css={[navItemStyle, navSecondaryStyle]} to='/#find-lawmaker'>Find a lawmaker</AnchorLink>
        <AnchorLink css={[navItemStyle, navSecondaryStyle]} to='/#find-district'>Find your reps</AnchorLink>
        <a css={[navItemStyle, navSecondaryStyle]} href="https://montanafreepress.org/home/2021-mt-legislature/">News coverage</a>
        <AnchorLink css={[navItemStyle, navSecondaryStyle]} to='/#about'>About this project</AnchorLink>
    </div>


</div>

export default Nav

