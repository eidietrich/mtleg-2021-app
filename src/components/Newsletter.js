import React from 'react';
import { css } from '@emotion/react'

const backgroundCss = css`
    background-color: #171818;
    color: white;
    padding: 1em;
    text-align: center;
    margin-bottom: 2em;
    margin-top: 2em;
`
const logoLine = css`
    font-weight: bold;
    font-size: 1.4em;
    color: #AE9864;
    text-transform: uppercase;
`
const line1Css = css`
    font-size: 1.2em;
    margin-bottom: 0.5em;
    /* font-weight: bold; */
`
const line2Css = css``

const Newsletter = (props) => {
    return <div css={backgroundCss}>
        <div css={logoLine}>Montana Free Press</div>
        <div css={line1Css}>Local journalists covering Montana for you.</div>
        <div css={line2Css}><a href="https://montanafreepress.org/sign-up/">Subscribe to our free newsletter</a></div>
    </div>
}

export default Newsletter