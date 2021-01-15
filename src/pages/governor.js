import React from "react"
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Text from '../components/Text'
import LinksList from '../components/LinksList'
import ContactUs from '../components/ContactUs'
import BillTable from '../components/BillTable'

import { text, articles } from '../data/governor.json'
import { summary, mostRecentActionDate } from '../data/summary.json'
import { numberFormat, dateFormat } from "../config/utils"

const Governor = ({data}) => {
  const numBillsBeforeGov = summary.houseBills.toGovernor + summary.senateBills.toGovernor
  const plural = (numBillsBeforeGov !== 1) ? 's' : ''

  const governorBills = data.governorBills.edges.map(d => d.node)

  return <div>
    <SEO title="Governor Greg Gianforte" />
    <Layout>
      <h1>Gov. Greg Gianforte</h1>
      <Text paragraphs={text.description} />

      <h3 id="governor-bills">On the governor's desk</h3>
      <p>As of {dateFormat(new Date(mostRecentActionDate))}, <strong>{numberFormat(numBillsBeforeGov)} bill{plural}</strong> from the 2021 Legislature had been sent to Gov. Gianforte for his signature.</p>
      <h4>Bills currently before the Governor</h4>
      <BillTable bills={governorBills} />
      
      <h4>Signed into law</h4>
      <div>TK</div>

      <h4>Let pass without signature</h4>
      <div>Bills that have become law without the governor's signature after the Governor chooses not to issue a signature or veto by the deadlines specified in the Montana Constitution, 5 days if the Legislature is in sessiona and 25 days if it isn't.</div>
      <div>TK</div>

      <h4>Vetoed</h4>
      <div>The Montana Constitution requires that the governor provide explanation for his vetos. Vetos can be overridden by two-thirds majorities in the House and Senate.</div>
      <div>TK - include veto memos, veto override attempts here </div>

      <h3>News coverage</h3>
      <div>MTFP legislative coverage involving the Governor's Office</div>
      <LinksList articles={articles} />

      <ContactUs />

    </Layout>
  </div>
}

export const query = graphql`
  query GovernorPageQuery {
    governorBills: allBillsJson(filter: {status: {step: {eq: "Governor"}}}) {
      edges {
        node {
          key
          title
          identifier
          status {
            key
            step
            label
            status
          }
        }
      }
    }
  }
`

export default Governor