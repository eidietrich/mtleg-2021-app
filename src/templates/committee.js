import React from "react";
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from "../components/Seo"
import Text from '../components/Text'

import ContactUs from '../components/ContactUs'
import LinksList from '../components/LinksList'
import Newsletter from '../components/Newsletter'

import BillTable from '../components/BillTable'
import CommiteeStats from '../components/committee/Stats'
import Membership from '../components/committee/Membership'

import { parseDate, dateFormatWithWeekday, } from '../config/utils'

import { noteStyle } from '../config/styles';

const CommitteePage = (props) => {
    const { committee } = props.pageContext
    const { name, members, bills, overview } = committee

    const upcomingHearingDates = Array.from(new Set(bills.filter(d => d.hearingSet).map(d => d.hearingSet.date)))
        .sort((a,b) => new Date(a) - new Date(b))

    return <div>
        <SEO
            title={`${name} Committee`}
            description={`Bill details, sponsor, text, procedural status and more.`}
        />
        <Layout>
            <h1>{name} Committee</h1>
            
            <Membership members={members} />

            <h3>Docket</h3>

            <CommiteeStats stats={overview} />

            <h4>Bills referred to committee, awaiting hearing</h4>
            <BillTable bills={bills.filter(d => d.committeeStatus === 'pending')} />

            <h4>Hearings set</h4>
            {
                upcomingHearingDates.map(date => {
                    return <div key={date}>
                        <h5>{dateFormatWithWeekday(parseDate(date))}</h5>
                        <BillTable suppressCount bills={bills.filter(d => d.committeeStatus === 'hearing-set').filter(d => d.hearingSet.date === date)} />
                    </div>
                })
            }
            {
                (upcomingHearingDates.length === 0) && <div css={noteStyle}>None at present</div>
            }
            
            <h4>Bills heard, committee votes pending</h4>
            <BillTable bills={bills.filter(d => d.committeeStatus === 'heard')} />

            <h4>Bills voted on to floor debate</h4>
            <BillTable bills={bills.filter(d => d.committeeStatus === 'passed')} />

            <h4>Bills voted down or tabled</h4>
            <BillTable bills={bills.filter(d => d.committeeStatus === 'stalled')} />

            <Newsletter />

            

            <ContactUs />
        </Layout>
    </div>;
};

export default CommitteePage;