import React from "react"
import { css } from '@emotion/react'

import BillTable from '../../components/BillTable'

import { AnchorLink } from "gatsby-plugin-anchor-links";

import { parseDate, formatTime, dateFormatWithWeekday, shortDateWithWeekday } from '../../config/utils'

import { floorActions, updateTime } from '../../data/summary.json'


const datesContainerCss = css`
    margin: 0.3em -0.2em;
`
const dateCss = css`
    display: inline-block;
    border: 1px solid #666;
    padding: 0.2em 0.5em;
    margin: 0.2em;

    background-color: #eae3da;

`
const pluralize = val => (val === 1) ? 'bill' : 'bills'

const yesterdayBeforeMidnight = new Date(new Date().setHours(0, 0, 0, -1))
const upcomingDates = Array.from(new Set(floorActions.map(d => d.date)))
    .sort((a, b) => new Date(a) - new Date(b))
    .filter(date => parseDate(date) > yesterdayBeforeMidnight)

const UpcomingFloorActions = () => {
    return <div>
        {/* <div css={datesContainerCss}>
            {
                upcomingDates.map(date => {
                    const numActions = floorActions.filter(d => d.date === date).length
                    return <span key={date} css={dateCss}>
                        <AnchorLink to={`/calendar#hearings-${date.replace('/\s/', '-')}`}><strong>{numActions}</strong> {pluralize(numActions)} {shortDateWithWeekday(parseDate(date))}</AnchorLink>
                    </span>
                })
            }

            <div className="note">Listings include actions announced as of {formatTime(new Date(updateTime))}.</div>
        </div> */}
        {
            // TODO - break committees out to separate thing, streamline this logic
            upcomingDates.map(date => {
                const actionsOnDate = floorActions.filter(d => d.date === date)
                const houseActions = actionsOnDate.filter(d => d.chamber === 'House')
                const houseSecondReadings = houseActions.filter(d => d.description === 'Scheduled for 2nd Reading')
                const houseThirdReadings = houseActions.filter(d => d.description === 'Scheduled for 3rd Reading')

                const senateActions = actionsOnDate.filter(d => d.chamber === 'Senate')
                const senateSecondReadings = senateActions.filter(d => d.description === 'Scheduled for 2nd Reading')
                const senateThirdReadings = senateActions.filter(d => d.description === 'Scheduled for 3rd Reading')

                return <div key={date}>
                    <h3 id={'hearings-' + date.replace('/\s/', '-')}>{dateFormatWithWeekday(parseDate(date))}</h3>
                    <div>
                        <h4>House Floor</h4>
                        <h5>Second readings scheduled</h5>
                        <div className="note">Debate and initial floor vote</div>
                        <BillTable bills={houseSecondReadings.map(d => d.bill)} />

                        <h5>Third readings scheduled</h5>
                        <div className="note">Final floor votes</div>
                        <BillTable bills={houseThirdReadings.map(d => d.bill)} />

                        <h4>Senate Floor</h4>
                        <h5>Second readings scheduled</h5>
                        <div className="note">Debate and initial floor vote</div>
                        <BillTable bills={senateSecondReadings.map(d => d.bill)} />

                        <h5>Third readings scheduled</h5>
                        <div className="note">Final floor votes</div>
                        <BillTable bills={senateThirdReadings.map(d => d.bill)} />

                    </div>

                </div>

            })
        }
    </div>
}
export default UpcomingFloorActions