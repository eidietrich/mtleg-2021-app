import React from "react"
import { graphql } from 'gatsby'
import { AnchorLink } from "gatsby-plugin-anchor-links";

import Layout from '../components/Layout'
import SEO from "../components/Seo"
import Text from '../components/Text'
import Roster from '../components/Roster'
import ChamberLeadership from '../components/ChamberLeadership'
import BillTable from '../components/BillTable'
import ContactUs from '../components/ContactUs'
import Newsletter from '../components/Newsletter'

import { text } from '../data/house.json'

// TODO - break this out to app text
const leadership = [
  { role: 'Speaker of the House', name: 'Rep. Wylie Galt (R-Martinsdale)', key: 'Wylie-Galt' },
  { role: 'Majority Leader', name: 'Rep. Sue Vinton (R-Billings)', key: 'Sue-Vinton' },
  { role: 'Minority Leader', name: 'Rep. Kim Abbott (D-Helena)', key: 'Kim-Abbott' },
]

const House = ({ data }) => {
  const representatives = data.allLawmakersJson.edges.map(d => d.node)

  const houseBills = data.houseBills.edges.map(d => d.node).filter(d => d.type === 'bill')
  const senateBills = data.senateBills.edges.map(d => d.node).filter(d => d.type === 'bill')

  const houseBillsInHouse = houseBills.filter(d => d.status.step === 'First chamber')
  const senateBillsInHouse = senateBills.filter(d => d.status.step === 'Second chamber')

  // First chamber
  const billsInCommittee = houseBillsInHouse
    .filter(d => ['Introduced','In committee', 'Tabled in committee'].includes(d.status.label))
  const billsAwaitingFloorAction = houseBillsInHouse
    .filter(d => d.status.label === 'Out of committee' )
  const billsThruFloorAction = houseBillsInHouse
    .filter(d => !['Introduced','In committee', 'Out of committee', 'Tabled in committee', 'On floor'].includes(d.status.label))

  // Second chamber
  const billsTransmittedToSecondChamber = senateBillsInHouse
  .filter(d => d.status.label === 'Transmitted' )
  const billsInCommitteeSecondChamber = senateBillsInHouse
    .filter(d => ['Introduced','In committee', 'Tabled in committee'].includes(d.status.label))
  const billsAwaitingFloorActionSecondChamber = senateBillsInHouse
    .filter(d => d.status.label === 'Out of committee' )
  const billsThruFloorActionSecondChamber = senateBillsInHouse
  .filter(d => !['Transmitted','In committee', 'Out of committee', 'Tabled in committee', 'On floor'].includes(d.status.label))

  // other steps
  const houseBillsInReconciliation = houseBills.filter(d => d.status.step === 'Reconciliation')
  const houseBillsThruLegislature = houseBills.filter(d => d.status.step === 'Through Legislature')
  const houseBillsPassed = houseBills.filter(d => d.status.step === 'Passed')
  const houseBillsDead = houseBills.filter(d => d.status.step === 'Failed')
  
  // Resolutions
  const houseResolutions = data.houseBills.edges.map(d => d.node).filter(d => d.type !== 'bill')
  const houseResolutionsProposed = houseResolutions.filter(d => d.status.step !== 'Passed')
  const houseResolutionsPassed = houseResolutions.filter(d => d.status.step === 'Passed')

  return <div>
    <SEO
      title="Montana House"
      description="How the 100 state Representatives in Montana's Republican-controlled House are working to shape state law."
    />
    <Layout>
      <h1>The Montana House</h1>
      <div>67 Republicans, 33 Democrats</div>

      <Text paragraphs={text.description} />

      <Newsletter />

      <ChamberLeadership leadership={leadership} />

      <Roster title="Membership" chamberLabel="House" lawmakers={representatives} />

      <h2 id="house-bills-in-house">House bills before the House (in their first chamber)</h2>

      <h4>In initial committees</h4>
      <div className="note">Committees serve as a first line of review, deciding which bills to advance for floor debate.</div>
      <BillTable bills={billsInCommittee} displayLimit={15}/>
      
      <h4>Out of committee, awaiting floor debate</h4>
      <div className="note">Bills can sometimes be rereferred to a second committee.</div>
      <BillTable bills={billsAwaitingFloorAction} displayLimit={5}/>

      <h4>Through floor debate</h4>
      <div className="note">Second reading votes, the first vote bills typically receive from the full House, occur following floor debate. Bills don't officially pass the House until a final, third reading vote.</div>
      <BillTable bills={billsThruFloorAction} displayLimit={5}/>

      <h2>House bills passed by the House</h2>
      <div className="note"><AnchorLink to="/senate#house-bills-in-senate">Transmitted to the Senate</AnchorLink> for consideration.</div>

      <h2 id="senate-bills-in-house">Senate bills before the House (in their second chamber)</h2>
      <div className="note">Bills passed by the Senate and transmitted to the House for a second round of consideration.</div>
      <h4>Transmitted to House</h4>
      <BillTable bills={billsTransmittedToSecondChamber} displayLimit={5}/>
      
      <h4>In initial committees</h4>
      <BillTable bills={billsInCommitteeSecondChamber} displayLimit={5}/>
      
      <h4>Out of committee, awaiting floor debate</h4>
      <BillTable bills={billsAwaitingFloorActionSecondChamber} displayLimit={5}/>

      <h4>Through floor debate</h4>
      <BillTable bills={billsThruFloorActionSecondChamber} displayLimit={5}/>


      <h2>House bills passed by both chambers</h2>

      <h4 id="house-bills-in-reconciliation">In reconcilation</h4>
      <div className="note">House bills passed by the House and then passed by the Senate with amendments. If the House doesn't vote to accept the changes, lawmakers must negotiate a version of the bill that can pass both chambers.</div>
      <BillTable bills={houseBillsInReconciliation} displayLimit={5}/>

      <h4 id="house-bills-through-legislature">In administrative review</h4>
      <div className="note">Bills in their final enrolling process before transmittal to the governor.</div>
      <BillTable bills={houseBillsThruLegislature} displayLimit={5}/>

      <h4>Transmitted to Governor</h4>
      <div className="note">Bills passed by both chambers and transmitted to the governor for his signature <AnchorLink to="/governor#governor-bills">are available here</AnchorLink>.</div>

      <h2 is="house-bills-passed">House Bills becoming law</h2>
      <div className="note">Bills that have passed all three key procedural hurdles: The House, Senate and governor.</div>
      <BillTable bills={houseBillsPassed} displayLimit={5}/>

      <h2 is="house-bills-dead">House Bills killed in process</h2>
      <div className="note">In rare situations, dead bills can resurrected with supermajority votes. Bills tabled in committee are often headed toward death but aren't classified as such until they miss a procedural deadline.</div>
      <BillTable bills={houseBillsDead} displayLimit={5}/>

      <h2>House resolutions and voter referendum proposals</h2>
      <div className="note">House resolutions pass with approval from the House, while joint resolutions and voter referendum proposals need approval from the House and Senate. Resolutions and referendum proposals don't require approval from the governor.</div>
      
      <h4>Proposed</h4>
      <BillTable bills={houseResolutionsProposed} displayLimit={5}/>

      <h4>Passed</h4>
      <BillTable bills={houseResolutionsPassed} displayLimit={5}/>

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
          locale {
            short
          }
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
          identifier
          title
          label
          type
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
          identifier
          title
          label
          type
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