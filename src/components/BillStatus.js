import React from 'react'
import { css } from '@emotion/react'

import {
    statusColors,
  } from '../config/config'

const blockCss = css`
    padding: 0.2em 0.3em;
    line-height: 1.5em;
    border: 1px solid #666;

`
const stepContainerCss = css`
    display: flex;
    flex-wrap: wrap;
    margin: 0 -0.3em;
`
const stepCss = css`
    display: flex;
    border: 1px solid #222;
    background-color: #EAE3DA;
    margin: 0.1em 0.3em;
`
const fadeCss = css`
    opacity: 0.8;
`
const labelColCss = css`
    /* flex: 1 0 100px; */
    background-color: #222;
    padding: 0.25em;
    color: white;
`
const dekCss = css`
    font-size: 0.7em;
`
const labelCss = css`
    font-weight: bold;
    text-transform: uppercase;
`
const detailColCss = css`
    /* flex: 1 0 auto; */
    padding: 0.25em 0.5em;
    min-width: 5em;
    max-width: 10em;
    min-height: 2em;
    display: flex;
    align-items: center;
    justify-content: center;
`
const detailCss = css`

`

const statusCss = css`
    font-weight: bold;
    text-transform: uppercase;
    color: #473d29;
`
const makeFirstChamberDetailText = (progress) => {
    return progress.firstChamberStatus
}
const makeSecondChamberDetailText = (progress) => {
    return progress.secondChamberStatus
}
const makeGovernorDetailText = (progress) => {
    return progress.governorStatus
}

const BillStatus = (props) => {
    const { identifier, type, status, progress } = props

    // SKETCHING
    // RESOLUTIONS ONLY HAVE ONE HOUSE
    // JOINT RESOLUTIONS HAVE TWO HOUSES, NO GOV
    // BILLS HAVE ALL THREE HOUSES
    const steps = []
    const chamberOrder = identifier.includes('HB') ? ['House', 'Senate'] : ['Senate', 'House']
    // First house for all types
    if (['bill','joint resolution','resolution'].includes(type)) {
        const detail = makeFirstChamberDetailText(progress)
        steps.push({
            label: chamberOrder[0],
            dek: '1st chamber',
            detail: 'XXX',
            faded: !progress.toFirstChamber,
            detail,

        })
    }
    if (['bill','joint resolution'].includes(type)) {
        // No second chamber for resolutions
        const detail = makeSecondChamberDetailText(progress)
        steps.push({
            label: chamberOrder[1],
            dek: '2nd chamber',
            detail: 'XXX',
            faded: !progress.toSecondChamber,
            detail,
        })
    }
    if (type === 'bill') {
        // Governor for bills only
        const detail = makeGovernorDetailText(progress)
        steps.push({
            label: 'governor',
            dek: 'Executive',
            faded: !progress.toGovernor,
            detail: detail,
        })
    }
    const color = statusColors(status.status)
    
    const iconCss = css`
        background-color: ${color};
        display: inline-block;
        position: relative;
        top: 1px;
        width: 0.8em;
        height: 0.8em;
        margin-right: 0.2em;
    `
    return <div>
        {/* TODO: Finish implementing this status tracker */}
        {/* <div css={stepContainerCss}>
            {steps.map(d => <ProcessStep key={d.label} {...d} />)}
        </div> */}
        <div css={statusCss}><span css={iconCss}></span>{status.key.replace('--', ' — ')}</div>
    </div>
}

const ProcessStep = ({ label, dek, detail, faded, color}) => {
    const bgColorCss = css`
        background-color: ${color};
    `
    return <div css={!faded ? stepCss : [stepCss, fadeCss]}>
        <div css={labelColCss}>
            <div css={labelCss}>{label}</div>
            <div css={dekCss}>{dek}</div>
        </div>
        {
            detail ? <div css={[detailColCss, bgColorCss]}>
                <div css={detailCss}>{detail}</div>
            </div> : null
        }
    </div>
}


export default BillStatus