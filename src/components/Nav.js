import React from 'react'
import { css } from '@emotion/react'
import { Link } from 'gatsby'

const navStyle = css`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;

    margin: 0 -0.25em; /* Aligns items to edges*/
`

const navItemStyle = css`
    flex: 1 1 8em;
    height: 2em;

    border: 1px solid #bbb;
    box-shadow: 2px 2px 3px #ddd;
    color: #222;
    
    margin: 0 0.25em;
    margin-bottom: 0.5rem;

    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    font-weight: bold;

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`

const Nav = (props) => <div css={navStyle}>
    <Link css={navItemStyle} to='/'>Overview</Link>
    <Link css={navItemStyle} to='/house'>House</Link>
    <Link css={navItemStyle} to='/senate'>Senate</Link>
    <Link css={navItemStyle} to='/governor'>Governor</Link>
</div>

export default Nav

