import React from "react"
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Text from '../components/Text'
import LinksList from '../components/LinksList'
import ContactUs from '../components/ContactUs'
import BillTable from '../components/BillTable'
import Newsletter from '../components/Newsletter'

import { text, articles } from '../data/governor.json'
import { summary, mostRecentActionDate } from '../data/summary.json'
import { numberFormat, dateFormat } from "../config/utils"

// filter functions
// const toGovernor = d => d.data.progress.toGovernor
const awaitingGovernorAction = d => d.progress.governorStatus === 'pending'
const signedByGovernor = d => d.progress.governorStatus === 'signed'
const vetoedByGovernor = d => d.progress.governorStatus === 'vetoed'
const enactedWithNoGovernorSignature = d => d.progress.governorStatus === 'became law unsigned'

const Governor = ({ data }) => {
  const numBillsBeforeGov = summary.houseBills.toGovernor + summary.senateBills.toGovernor
  const plural = (numBillsBeforeGov !== 1) ? 's' : ''

  const governorBills = data.governorBills.edges.map(d => d.node)

  const awaitingActionBills = governorBills.filter(awaitingGovernorAction)
  const signedBills = governorBills.filter(signedByGovernor)
  const vetoedBills = governorBills.filter(vetoedByGovernor)
  const letBecomeLawBills = governorBills.filter(enactedWithNoGovernorSignature)


  return <div>
    <SEO
      title="Montana Gov. Greg Gianforte"
      description="How Montana's first Republican governor since 2005 is treating the bills passed to his desk."
    />
    <Layout>
      <h1>Gov. Greg Gianforte</h1>
      <Text paragraphs={text.description} />

      <h2 id="governor-bills">The governor's desk</h2>
      <p>As of {dateFormat(new Date(mostRecentActionDate))}, <strong>{numberFormat(numBillsBeforeGov)} bill{plural}</strong> from the 2021 Legislature had been sent to Gov. Gianforte for his signature.</p>
      <h4>Currently before the governor</h4>
      <BillTable bills={awaitingActionBills} />

      <h4>Vetoed</h4>
      <div className="note">The Montana Constitution requires that the governor provide explanation for vetos. Vetos can be overridden by two-thirds majorities in the House and Senate.</div>
      <BillTable bills={vetoedBills} />

      <h4>Signed into law</h4>
      <BillTable bills={signedBills} />

      <h4>Became law without signature</h4>
      <div className="note">Bills that have become law without the governor's signature after the governor chooses not to issue a signature or a veto by the 10-day deadline specified in the Montana Constitution.</div>
      <BillTable bills={letBecomeLawBills} />



      <Newsletter />

      <h3>News coverage</h3>
      <div>MTFP legislative coverage involving the Governor's Office</div>
      <LinksList articles={articles} />

      <ContactUs />

    </Layout>
  </div>
}

export const query = graphql`
  query GovernorPageQuery {
    governorBills: allBillsJson(filter: {progress: {toGovernor: {eq: true}}}) {
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
          progress {
            toGovernor
            governorStatus
          }
          textUrl
          fiscalNoteUrl
          legalNoteUrl
          vetoMemoUrl
          numArticles
          sponsor {
            name
            district
            party
          }
        }
      }
    }
  }
`

export default Governor