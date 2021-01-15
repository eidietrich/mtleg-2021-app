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

import { text } from '../data/house.json'

// TODO - break this out to app text
const leadership = [
  { role: 'Speaker of the House', name: 'Rep. Wylie Galt (R)', key: 'Wylie-Galt' },
  { role: 'Majority Leader', name: 'Rep. Sue Vinton (R)', key: 'Sue-Vinton' },
  { role: 'Minority Leader', name: 'Rep. Kim Abbott (D)', key: 'Kim-Abbott' },
]

const House = ({ data }) => {
  const representatives = data.allLawmakersJson.edges.map(d => d.node)
  
  const houseBillsInHouse = data.houseBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'First chamber')
  const senateBillsInHouse = data.senateBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Second chamber')

  const houseBillsInReconciliation = data.houseBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Reconciliation')
  const houseBillsPassed = data.houseBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Passed')
  const houseBillsDead = data.houseBills.edges.map(d => d.node)
    .filter(d => d.status.step === 'Failed')


  const billsInCommittee = houseBillsInHouse
    .filter(d => ['Introduced','In committee', 'Tabled'].includes(d.status.label))
  const billsAwaitingFloorAction = houseBillsInHouse
    .filter(d => d.status.label === 'On floor' )
  const billsThruFloorAction = houseBillsInHouse
    .filter(d => !['Introduced','In committee', 'Tabled', 'On floor'].includes(d.status.label))


  return <div>
    <SEO title="Montana House" />
    <Layout>
      <h1>The Montana House</h1>
      <div>67 Republicans, 33 Democrats</div>

      <Text paragraphs={text.description} />

      <ChamberLeadership leadership={leadership} />

      <Roster title="Membership" chamberLabel="House" lawmakers={representatives} />

      <h3 id="house-bills-in-house">House Bills before the House</h3>
      <div>Bills introduced in the House that haven't passed the chamber</div>

      <h4>In initial committees</h4>
      <BillTable bills={billsInCommittee} />
      
      <h4>Out of committee, awaiting floor debate</h4>
      <BillTable bills={billsAwaitingFloorAction} />

      <h4>Through floor debate</h4>
      <div className="note">House floor debates occur before second reading votes. Bills don't officially pass the House until a final, third reading vote.</div>
      <BillTable bills={billsThruFloorAction} />

      <h3 id="senate-bills-in-house">Senate Bills before the House</h3>
      <div>Bills passed by the Senate and transmitted to the House. House bills that have passed the House and to face consideration by the Senate <AnchorLink to="/senate#house-bills-in-senate">are listed here</AnchorLink>. </div>
      <div></div>
      <BillTable bills={senateBillsInHouse} />

      <h3 id="house-bills-in-reconciliation">House Bills in reconcilation</h3>
      <div>House bills passed by the House and Senate with different text. Lawmakers must negotiate a single version of the bill that meets approval from both chambers.</div>
      <BillTable bills={houseBillsInReconciliation} />

      <h3>House Bills passed to Governor</h3>
      <div>Bills passed by both chambers and transmitted to the governor for his signature <AnchorLink to="/governor#governor-bills">are available here</AnchorLink>.</div>

      <h3 is="house-bills-passed">House Bills passed</h3>
      <BillTable bills={houseBillsPassed} />

      <h3 is="house-bills-dead">House Bills killed in process</h3>
      <div>Bills tabled in committee are likely headed toward death but aren't classified as such until they miss a procedural deadline. In rare situations, dead bills can resurrected with supermajority votes.</div>
      <BillTable bills={houseBillsDead} />

      <ContactUs />

    </Layout>
  </div>
}

export const query = graphql`
  query HousePageQuery {
    allLawmakersJson(filter: {chamber: {eq: "house"}}, sort: {fields: [districtNum], order: ASC}) {
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

export default House