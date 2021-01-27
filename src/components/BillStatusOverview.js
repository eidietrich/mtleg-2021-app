import React from 'react'
import { css } from '@emotion/react'

import { numberFormat } from '../config/utils'

const containerCss = css`
    border: 1px solid red;
    background-color: #EAE3DA;
    border: 1px solid #806F47;
    padding: 1em;
`

const rowCss = css`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    border-top: 1px solid #CEBC9F;
    padding: 0.75em 0.5em;

    :first-of-type {
        border-top: none;
    }
    
`

const subColCss = css`
    /* border: 1px solid red; */
    flex: 1 0 4em;
    margin-right: 0.5em;
`
const keyNumCss = css`
    font-size: 1.5em;
    font-weight: bold;
    color: #473D29;
`
const numCss = css`
    font-size: 1.2em;
    font-weight: bold;
    text-align: right;
    color: #473D29;
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
    return <div css={containerCss}>
        

        <div css={rowCss}>
            <div css={subColCss}>
                <div css={keyNumCss}>{numberFormat(houseBills.total)}</div>
                 {/* Using total vs. introduced here b/c of LAWS status bug */}
                <div css={keyLabelCss}>House bills introduced</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed by House</div>
                <div css={numCss}>{numberFormat(houseBills.pastFirstChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed by Senate</div>
                <div css={numCss}>{numberFormat(houseBills.pastSecondChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed through Governor</div>
                <div css={numCss}>{numberFormat(houseBills.pastGovernor)}</div>
            </div>
        </div>
        <div css={rowCss}>
            <div css={subColCss}>
                <div css={keyNumCss}>{numberFormat(senateBills.total)}</div>
                {/* Using total vs. introduced here b/c of LAWS status bug */}
                <div css={keyLabelCss}>Senate bills introduced</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed by Senate</div>
                <div css={numCss}>{numberFormat(senateBills.pastFirstChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed by House</div>
                <div css={numCss}>{numberFormat(senateBills.pastSecondChamber)}</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed through Governor</div>
                <div css={numCss}>{numberFormat(senateBills.pastGovernor)}</div>
            </div>
        </div>
        <div css={rowCss}>
            <div css={subColCss}>
                <div css={keyNumCss}>{numberFormat(resolutions.introduced)}</div>
                <div css={keyLabelCss}>Resolutions and referendum proposals introduced</div>
            </div>
            <div css={subColCss}>
                <div css={labelCss}>Passed</div>
                <div css={numCss}>{numberFormat(resolutions.passed)}</div>
            </div>
        </div>
        
        <div css={rowCss}>
        <div><span css={numCss}>{numberFormat(numBillsAndResolutions)} </span><em>total bills and resolutions introduced</em></div>
        </div>        
    </div>
}

export default BillStatusOverview