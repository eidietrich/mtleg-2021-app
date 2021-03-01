import React from 'react';
import { css } from '@emotion/react'

import {
  numberFormat,
  percentFormat,
  capitalize
} from '../../config/utils'

const textStyle = css`
  font-size: 1em;
  margin-bottom: 0.2em;
`

const pullStatContainerStyle = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  border: 1px solid #806F47;
  background-color: #EAE3DA;
  padding: 0.5em;
  margin-bottom: 0.5em;

  div {
    flex: 1 1 50px;
    max-width: 150px;
    margin: 0.5em;
  }
  
`

const pullStatStyle = css`
  font-size: 2.5em;
  font-weight: bold;
  display: block;
  text-align: center;

  @media screen and (max-width: 400px) {
    font-size: 1.5em;
  }
`
const pullStatStyleSecondary = css`
  font-size: 2em;
  font-weight: bold;
  display: block;
  text-align: center;

  @media screen and (max-width: 400px) {
    font-size: 1.2em;
  }
`
const labelStyle = css`
  font-size: 1em;
  display: block;
  text-align: center;

  @media screen and (max-width: 400px) {
    font-size: 0.8em;
  }
`

const CommitteeBillStatistics = ({stats}) => {
  const {
    billsReferred, billsHeard,
    billsPassed, fractionBillsPassed,
    gopBillsPassed, fractionGopBillsPassed,
    demBillsPassed, fractionDemBillsPassed,
  } = stats
  return <div>
      <div css={pullStatContainerStyle}>
        <div>
          <span css={pullStatStyle}>{numberFormat(billsReferred)}</span>
          <span css={labelStyle}>Bills sent to committee</span>
        </div>
        <div>
          <span css={pullStatStyle}>{numberFormat(billsHeard)}</span>
          <span css={labelStyle}>Bills heard</span>
        </div>
        <div>
          <span css={pullStatStyle}>{numberFormat(billsPassed)}</span>
          <span css={labelStyle}>Bills passed ({percentFormat(fractionBillsPassed)})</span>
        </div>
        <div>
          <span css={pullStatStyleSecondary}>{numberFormat(gopBillsPassed)}</span>
          <span css={labelStyle}>GOP bills passed ({percentFormat(fractionGopBillsPassed)})</span>
        </div>
        <div>
          <span css={pullStatStyleSecondary}>{numberFormat(demBillsPassed)}</span>
          <span css={labelStyle}>Dem. bills passed ({percentFormat(fractionDemBillsPassed)})</span>
        </div>
      </div>
  </div>
};

export default CommitteeBillStatistics