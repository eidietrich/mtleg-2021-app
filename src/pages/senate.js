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

import { text } from '../data/senate.json'

// TODO - break this out to app text
const leadership = [
  { role: 'Senate President', name: 'Sen. Mark Blasdel (R-Kalispell)', key: 'Mark-Blasdel' },
  { role: 'Senate Majority Leader', name: 'Sen. Cary Smith (R-Billings)', key: 'Cary-Smith' },
  { role: 'Senate Minority Leader', name: 'Sen. Jill Cohenour (D-East Helena)', key: 'Jill-Cohenour' },
]

const Senate = ({ data }) => {
  const senators = data.allLawmakersJson.edges.map(d => d.node)
  const senateBills = data.senateBills.edges.map(d => d.node).filter(d => d.type === 'bill')
  const houseBills = data.houseBills.edges.map(d => d.node).filter(d => d.type === 'bill')
  
  const senateBillsInSenate = senateBills.filter(d => d.status.step === 'First chamber')
  const houseBillsInSenate = houseBills.filter(d => d.status.step === 'Second chamber')

  // initial chamber
  const billsInCommittee = senateBillsInSenate
    .filter(d => ['Introduced','In committee', 'Tabled in committee'].includes(d.status.label))
  const billsAwaitingFloorAction = senateBillsInSenate
    .filter(d => d.status.label === 'Out of committee' )
  const billsThruFloorAction = senateBillsInSenate
    .filter(d => !['Introduced','In committee', 'Out of committee', 'Tabled in committee', 'On floor'].includes(d.status.label))

  // Second chamber
  const billsTransmittedToSecondChamber = houseBillsInSenate
  .filter(d => d.status.label === 'Transmitted' )
  const billsInCommitteeSecondChamber = houseBillsInSenate
    .filter(d => ['Introduced','In committee', 'Tabled in committee'].includes(d.status.label))
  const billsAwaitingFloorActionSecondChamber = houseBillsInSenate
    .filter(d => d.status.label === 'Out of committee' )
  const billsThruFloorActionSecondChamber = houseBillsInSenate
  .filter(d => !['Transmitted','In committee', 'Out of committee', 'Tabled in committee', 'On floor'].includes(d.status.label))

  // later steps
  const senateBillsInReconciliation = senateBills.filter(d => d.status.step === 'Reconciliation')
  const senateBillsThruLegislature = senateBills.filter(d => d.status.step === 'Through Legislature')
  const senateBillsPassed = senateBills.filter(d => d.status.step === 'Passed')
  const senateBillsDead = senateBills.filter(d => d.status.step === 'Failed')
  
  // Resolutions
  const senateResolutions = data.senateBills.edges.map(d => d.node)
    .filter(d => d.type !== 'bill')
  const senateResolutionsProposed = senateResolutions.filter(d => d.status.step !== 'Passed')
  const senateResolutionsPassed = senateResolutions.filter(d => d.status.step === 'Passed')

  return <div>
    <SEO
      title="Montana Senate"
      description="How the 50 state Senators in Montana's Republican-controlled Senate are working to shape state law."
    />
    <Layout>
      <h1>The Montana Senate</h1>
      <div>31 Republicans, 19 Democrats</div>
      <Text paragraphs={text.description} />

      <ChamberLeadership leadership={leadership} />

      <Newsletter />

      <Roster title="Membership" chamberLabel="Senate" lawmakers={senators} />

      <h2 id="senate-bills-in-senate">Senate bills before the Senate (in their first chamber)</h2>

      <h4>In initial committees</h4>
      <div className="note">Committees serve as a first line of review, deciding which bills to advance for floor debate.</div>
      <BillTable bills={billsInCommittee} displayLimit={15}/>
      
      <h4>Out of committee, awaiting floor debate</h4>
      <div className="note">Bills can sometimes be rereferred to a second committee.</div>
      <BillTable bills={billsAwaitingFloorAction} displayLimit={5}/>

      <h4>Through floor debate</h4>
      <div className="note">Second reading votes, the first vote bills typically receive from the full House, occur following floor debate. Bills don't officially pass the Senate until a final, third reading vote.</div>
      <BillTable bills={billsThruFloorAction} displayLimit={5}/>

      <h2>Senate bills passed by the Senate</h2>
      <div className="note"><AnchorLink to="/house#senate-bills-in-house">Transmitted to the House</AnchorLink> for consideration.</div>

      <h2 id="house-bills-in-senate">House bills before the Senate (in their second chamber)</h2>
      <div className="note">Bills passed by the House and transmitted to the Senate for a second round of consideration.</div>
      <h4>Transmitted to Senate</h4>
      <BillTable bills={billsTransmittedToSecondChamber} displayLimit={5}/>
      
      <h4>In initial committees</h4>
      <BillTable bills={billsInCommitteeSecondChamber} displayLimit={5}/>
      
      <h4>Out of committee, awaiting floor debate</h4>
      <BillTable bills={billsAwaitingFloorActionSecondChamber} displayLimit={5}/>

      <h4>Through floor debate</h4>
      <BillTable bills={billsThruFloorActionSecondChamber} displayLimit={5}/>

      <h2>Senate bills passed by both chambers</h2>

      <h4 id="senate-bills-in-reconciliation">In reconcilation</h4>
      <div className="note">Senate bills passed by the Senate and then passed by the House with amendments. If the Senate doesn't vote to accept the changes, lawmakers must negotiate a version of the bill that can pass both chambers.</div>
      <BillTable bills={senateBillsInReconciliation} displayLimit={5}/>

      <h4 id="senate-bills-through-legislature">In administrative review</h4>
      <div className="note">Bills in their final enrolling process before transmittal to the governor.</div>
      <BillTable bills={senateBillsThruLegislature} displayLimit={5}/>

      <h4>Transmitted to Governor</h4>
      <div className="note">Bills passed by both chambers and transmitted to the governor for his signature <AnchorLink to="/governor#governor-bills">are available here</AnchorLink>.</div>

      <h2 is="senate-bills-passed">Senate Bills becoming law</h2>
      <div className="note">Bills that have passed all three key procedural hurdles: The Senate, House and governor.</div>
      <BillTable bills={senateBillsPassed} displayLimit={5}/>

      <h2 is="senate-bills-dead">Senate Bills killed in process</h2>
      <div className="note">In rare situations, dead bills can resurrected with supermajority votes. Bills tabled in committee are often headed toward death but aren't classified as such until they miss a procedural deadline.</div>
      <BillTable bills={senateBillsDead} displayLimit={5}/>

      <h2>Senate resolutions and voter referendum proposals</h2>
      <div className="note">Senate resolutions pass with approval from the Senate, while joint resolutions and voter referendum proposals need approval from the Senate and House. Resolutions and referendum proposals don't require approval from the governor.</div>
      
      <h4>Proposed</h4>
      <BillTable bills={senateResolutionsProposed} displayLimit={5}/>

      <h4>Passed</h4>
      <BillTable bills={senateResolutionsPassed} displayLimit={5}/>

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
          title
          identifier
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
          title
          identifier
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

export default Senate