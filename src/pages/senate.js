import React from "react"
import { graphql } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";


import Layout from '../components/Layout'
import SEO from "../components/seo"
import Text from '../components/Text'
import Roster from '../components/Roster'
import ChamberLeadership from '../components/ChamberLeadership'
import BillTable from '../components/BillTable'
import ContactUs from '../components/ContactUs'

import { text } from '../data/senate.json'

// TODO - break this out to app text
const leadership = [
  { role: 'Senate President', name: 'Sen. Mark Blasdel (R)', key: 'Mark-Blasdel' },
  // {role: 'Senate President Pro Tempore', name: 'Sen. Jason Ellsworth (R)', key: 'Jason-Ellsworth'},
  { role: 'Senate Majority Leader', name: 'Sen. Cary Smith (R)', key: 'Cary-Smith' },
  { role: 'Senate Minority Leader', name: 'Sen. Jill Cohenour (D)', key: 'Jill-Cohenour' },
]

const Senate = ({ data }) => {
  const senators = data.allLawmakersJson.edges.map(d => d.node)

  
  const senateBillsInSenate = data.senateBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'First chamber')
    const houseBillsInSenate = data.houseBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Second chamber')

  const senateBillsInReconciliation = data.senateBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'reconciliation')
    
  const senateBillsPassed = data.senateBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Passed')
  const senateBillsDead = data.senateBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Failed')


  const billsInCommittee = senateBillsInSenate
    .filter(d => ['Introduced','In committee', 'Tabled'].includes(d.status.label))
  const billsAwaitingFloorAction = senateBillsInSenate
    .filter(d => d.status.label === 'On floor' )
  const billsThruFloorAction = senateBillsInSenate
    .filter(d => !['Introduced','In committee', 'Tabled', 'On floor'].includes(d.status.label))

  return <div>
    <SEO title="Montana Senate" />
    <Layout>
      <h1>The Montana Senate</h1>
      <div>31 Republicans, 19 Democrats</div>
      <Text paragraphs={text.description} />

      <ChamberLeadership leadership={leadership} />

      <Roster title="Membership" chamberLabel="Senate" lawmakers={senators} />

      <h3 id="senate-bills-in-senate">Senate Bills before the Senate</h3>
      <div>Bills introduced in the Senate that haven't passed the chamber</div>

      <h4>In initial committees</h4>
      <BillTable bills={billsInCommittee} />

      <h4>Out of committee, awaiting floor debate</h4>
      <BillTable bills={billsAwaitingFloorAction} />

      <h4>Through floor debate</h4>
      <div className="note">Senate floor debates occur before second reading votes. Bills don't officially pass the Senate until a final, third reading vote.</div>
      <BillTable bills={billsThruFloorAction} />

      <h3 id="house-bills-in-senate">House Bills before the Senate</h3>
      <div>Bills passed by the House and transmitted to the Senate. Senate bills that have passed the Senate to face consideration by the House <AnchorLink to="/house#senate-bills-in-house">are listed here</AnchorLink>. </div>
      <BillTable bills={houseBillsInSenate} />

      <h3 id="senate-bills-in-reconciliation">Senate Bills in reconcilation</h3>
      <div>Senate bills passed by the Senate and House with different text. Lawmakers must negotiate a single version of the bill that meets approval from both chambers.</div>
      <BillTable bills={senateBillsInReconciliation} />

      <h3>Senate Bills passed to Governor</h3>
      <div>Bills passed by both chambers and transmitted to the governor for his signature <AnchorLink to="/governor#governor-bills">are available here</AnchorLink>.</div>

      <h3 is="senate-bills-passed">Senate Bills passed</h3>
      <BillTable bills={senateBillsPassed} />

      <h3 is="senate-bills-dead">Senate Bills killed in process</h3>
      <div>Bills tabled in committee are likely headed toward death but aren't classified as such until they miss a procedural deadline. In rare situations, dead bills can resurrected with supermajority votes.</div>
      <BillTable bills={senateBillsDead} />

      <ContactUs />

    </Layout>
  </div>
}

export const query = graphql`
  query SenatePageQuery {
    allLawmakersJson(
      filter: {chamber: {eq: "senate"}}
      sort: {fields: [districtNum],order: ASC}
      ) {
      edges {
        node {
          key
          title
          name
          district {
            key
          }
          party
          residence
          votingSummary {
            numVotesRecorded
            fractionVotesNotPresent
            fractionVotesWithDemMajority
            fractionVotesWithGopMajority
            fractionVotesWithMajority
            numVotesCast
            numVotesNotPresent
            votesWithDemMajority
            votesWithGopMajority
            votesWithMajority
          }
        }
      }
    }
    houseBills: allBillsJson(filter: {chamber: {eq: "house"}}) {
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
    senateBills: allBillsJson(filter: {chamber: {eq: "senate"}}) {
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

export default Senate