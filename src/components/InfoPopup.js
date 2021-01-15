import React, { useState } from 'react'
import { css } from '@emotion/react'

const color = '#806f47'
const iconSvg = css`
    fill: white;
    position: relative;
    top: 3px;
    height: 16px;
    width: 16px;
    margin-right: 3px;
`

// From: https://material.io/resources/icons/?search=infor&icon=help&style=baseline
const questionMarkSvg = <svg css={iconSvg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <path fill={color} d="M0 0h24v24H0z" />
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
</svg>

// Adapted from https://codesandbox.io/s/how-to-make-an-extremely-reusable-tooltip-component-with-react-and-nothing-else-7opo3?from-embed=&file=/src/Tooltip.css

const tipWrapperCss = css`
    display: inline-block;
    position: relative;

    border: 2px solid${color};
    padding: 0.2em 0.4em;
    background-color: ${color};
    color: white;
    border-radius: 0.2em;
    font-size: 1em;

    width: 100%;
    max-width: 600px;

    cursor: pointer;

    :hover {
        background-color: ${color};
        border: 2px solid #222;
        box-shadow: 1px 1px 2px #eee;
    }

    div {
        margin-bottom: 0.5em;
    }
`
const tipCss = css`

    position: absolute;
    /* border-radius: 4px; */
    left: 50%;
    transform: translateX(-50%);
    padding: 6px;
    color: #222;
    background: #EAE3DA;
    font-size: 0.9em;
    line-height: 1.1;
    z-index: 100;
    /* white-space: nowrap; */
    border: 1px solid #666;
    width: 100%;

    /* font-style: italic; */
    text-transform: none;

    box-shadow: 2px 2px 3px #bbb;


    /* CSS border triangles */
    :before {
        content: " ";
        left: 50%;
        border: solid transparent;
        height: 0;
        width: 0;
        position: absolute;
        pointer-events: none;
        border-width: 6px;
        margin-left: -6px;
    }
`
const bottomCss = css`
    top: 40px;

    :before {
        bottom: 100%;
        border-bottom-color: ${color};
    }
`


const InfoPopup = (props) => {
    let timeout
    const [active, setActive] = useState(false)

    const showTip = () => {
        timeout = setTimeout(() => {
            setActive(true)
        }, props.delay || 400)
    }

    const hideTip = () => {
        clearInterval(timeout)
        setActive(false)
    }

    return <div css={tipWrapperCss} onMouseEnter={showTip} onMouseLeave={hideTip}>
        {questionMarkSvg}
        {props.label}
        {
            (active) && (
                <div css={[tipCss, props.direction || bottomCss]}>
                    {props.children}
                </div>
            )
        }
    </div>
}



export default InfoPopup