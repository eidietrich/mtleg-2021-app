import React from "react"
import { css } from '@emotion/react'

import BillTable from '../../components/BillTable'

import { AnchorLink } from "gatsby-plugin-anchor-links";

import { parseDate, formatTime, dateFormatWithWeekday, shortDateWithWeekday } from '../../config/utils'

import { hearings, updateTime } from '../../data/summary.json'



const legCalendarLink = 'http://laws.leg.mt.gov/reports/rwservlet?legprdext&report=LAW0635R.rdf&p_session_Id=20211&paramform=yes'

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
const pluralize = val => (val === 1) ? 'hearing' : 'hearings'

const yesterdayBeforeMidnight = new Date(new Date().setHours(0, 0, 0, -1))
const upcomingDates = Array.from(new Set(hearings.map(d => d.date)))
    .sort((a, b) => new Date(a) - new Date(b))
    .filter(date => parseDate(date) > yesterdayBeforeMidnight)

const UpcomingHearings = () => {
    return <div>
        <div>Hearings are an opportunity for the sponsor to explain a bill and for lobbyists and other members of the public to testify in support or opposition. Hearings are typically announced at least a few days in advance. Committees votes on forwarding bills for full floor debates typically happen at later committee meetings and often aren't announced in advance.</div>
        <div css={datesContainerCss}>
            {
                upcomingDates.map(date => {
                    const numHearings = hearings.filter(d => d.date === date).length
                    return <span key={date} css={dateCss}>
                        <AnchorLink to={`/calendar#hearings-${date.replace('/\s/', '-')}`}><strong>{numHearings}</strong> {pluralize(numHearings)} {shortDateWithWeekday(parseDate(date))}</AnchorLink>
                    </span>
                })
            }
        <div className="note">Listings include hearings announced as of {formatTime(new Date(updateTime))}.</div>
        </div>
        {
            // TODO - break committees out to separate thing, streamline this logic
            upcomingDates.map(date => {
                const hearingsOnDate = hearings.filter(d => d.date === date)

                const committeeNames = Array.from(new Set(hearingsOnDate.map(d => d.committee.name)))
                return <div key={date}>
                    <h3 id={'hearings-' + date.replace('/\s/', '-')}>{dateFormatWithWeekday(parseDate(date))}</h3>
                    {
                        committeeNames
                            .sort((a, b) => a.localeCompare(b))
                            .map((name, i) => {
                                const committee = hearingsOnDate.map(d => d.committee).find(d => d.name === name)
                                const billsBeingHeard = hearingsOnDate.filter(d => d.committee.name === committee.name)
                                return <div key={String(i)}>
                                    <h4>{committee.name}</h4>
                                    {
                                        (committee.daysOfWeek !== 'on call') &&
                                        <div className="note">Committee typically meets {committee.daysOfWeek} at {committee.time}, but schedules often change on short notice. Check the <a href={legCalendarLink}>the official hearing calendar</a>.</div>
                                    }
                                    {
                                        (committee.daysOfWeek === 'on call') &&
                                        <div className="note">Commitee meets on call.</div>
                                    }

                                    <BillTable bills={billsBeingHeard.map(d => d.bill) } displayLimit={20} suppressCount={true}/>
                                </div>
                            })
                    }

                </div>

            })
        }
    </div>
}
export default UpcomingHearings