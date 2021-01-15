import React from 'react'
import { css } from '@emotion/react'

import { numberFormat, dateFormat } from '../config/utils'

const rowCss = css`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    border-top: 1px solid #ddd;
    padding: 0.75em 0.5em;
    
`

const subColCss = css`
    /* border: 1px solid red; */
    flex: 1 0 4em;
    margin-right: 0.5em;
`
const keyNumCss = css`
    font-size: 1.5em;
    font-weight: bold;
`
const numCss = css`
    font-size: 1.2em;
    font-weight: bold;
    text-align: right;
`
const keyLabelCss = css`
    font-style:italic;
`
const labelCss = css`
    font-style: italic;
    text-align: right;
`

const BillStatusOverview = ({ summary, mostRecentActionDate }) => {
    const { senateBills, houseBills, resolutions, numBillsAndResolutions} = summary
    return <div>
        <div><strong>{numberFormat(numBillsAndResolutions)}</strong> bills and resolutions introduced as of {dateFormat(new Date(mostRecentActionDate))}:</div>

        <div css={rowCss}>
            <div css={subColCss}>
                <div css={keyNumCss}>{numberFormat(houseBills.introduced)}</div>
                <div css={keyLabelCss}>House bills introduced</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Past House</div>
                <div css={numCss}>{numberFormat(houseBills.pastFirstChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Past Senate</div>
                <div css={numCss}>{numberFormat(houseBills.pastSecondChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Past Governor</div>
                <div css={numCss}>{numberFormat(houseBills.pastGovernor)}</div>
            </div>
        </div>
        <div css={rowCss}>
            <div css={subColCss}>
                <div css={keyNumCss}>{numberFormat(senateBills.introduced)}</div>
                <div css={keyLabelCss}>Senate bills introduced</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Past Senate</div>
                <div css={numCss}>{numberFormat(senateBills.pastFirstChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Past House</div>
                <div css={numCss}>{numberFormat(senateBills.pastSecondChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Past Governor</div>
                <div css={numCss}>{numberFormat(senateBills.pastGovernor)}</div>
            </div>
        </div>
        <div css={rowCss}>
            <div css={subColCss}>
                <div css={keyNumCss}>{numberFormat(resolutions.introduced)}</div>
                <div css={keyLabelCss}>House & Senate resolutions introduced</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed</div>
                <div css={numCss}>{numberFormat(resolutions.passed)}</div>
            </div>
        </div>
    </div>
}

export default BillStatusOverview