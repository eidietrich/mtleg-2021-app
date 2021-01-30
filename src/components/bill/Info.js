import React from 'react';
import { css } from '@emotion/react'

import LawmakerInline from '../LawmakerInline'

import {
    dateFormat,
} from '../../config/utils'

const infoRowCss = css`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.125em;
  margin-right: 0.125em;
`
const infoColCss = css`
  flex: 1 1 100px;
  border: 1px solid #AE9864;
  padding: 0.25em;
  margin: 0.125em;

  background-color: #EAE3DA;
`
const infoColLabelCss = css`
  font-size: 0.8em;
  text-transform: uppercase;
  /* font-weight: bold; */
  color: #736440;
  margin-bottom: 0.25em;
`
const infoColContentCss = css`
  color: #222;
  display: flex;
  align-items: center;
  height: 2.2em;
  text-align: center;
`
const sponsorCss = css`
  margin-top: 0.3em;
  margin-bottom: 0.3em;
`

const BillInfo = ({ bill, sponsor }) => {
    const {
        lawsUrl, textUrl, fiscalNoteUrl, legalNoteUrl,
        transmittalDeadline, secondHouseReturnIfAmendedDeadline, voteMajorityRequired
    } = bill
    return <div>
        <div css={sponsorCss}>
            Sponsor: <LawmakerInline lawmaker={sponsor} />
        </div>

        <div css={infoRowCss}>

            <div css={infoColCss}>
                <div css={infoColLabelCss}>
                    Bill text
                </div>
                <div css={infoColContentCss}>
                    {
                        textUrl ?
                            <span><a href={textUrl}>Available here</a></span>
                            : <span>Not available</span>
                    }
                </div>
            </div>

            <div css={infoColCss}>
                <div css={infoColLabelCss}>
                    Fiscal note
                </div>
                <div css={infoColContentCss}>
                    {
                        fiscalNoteUrl ?
                            <span><a href={fiscalNoteUrl} target="_blank" rel="noopener noreferrer">Available here</a></span>
                            : <span>None on file</span>
                    }
                </div>
            </div>

            <div css={infoColCss}>
                <div css={infoColLabelCss}>
                    Legal note
                </div>
                <div css={infoColContentCss}>
                    {
                        legalNoteUrl ?
                            <span><a href={legalNoteUrl}>Available here</a></span>
                            : <span>None on file</span>
                    }
                </div>
            </div>

            <div css={infoColCss}>
                <div css={infoColLabelCss}>Official bill page</div>
                <div css={infoColContentCss}>
                    <a href={lawsUrl}>In LAWS database</a>
                </div>
            </div>

        </div>

        <div className="note">
            {(voteMajorityRequired !== 'Simple') ? <span> Passage requires supermajority, {voteMajorityRequired}. </span> : null}
            <span>Deadline for passing first chamber (the House for house bills and the Senate for senate bills):  {dateFormat(new Date(transmittalDeadline))}. </span>
            <span>Deadline for first chamber return if amended in second: {dateFormat(new Date(secondHouseReturnIfAmendedDeadline))}.</span>
        </div>
    </div>
}

export default BillInfo