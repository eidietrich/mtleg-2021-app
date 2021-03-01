import React from "react";
// import PropTypes from 'prop-types'

import Layout from '../components/Layout'
import SEO from "../components/Seo"
import Text from '../components/Text'

import ContactUs from '../components/ContactUs'
import LinksList from '../components/LinksList'
import Newsletter from '../components/Newsletter'

import BillStatus from '../components/bill/Status'
import BillInfo from '../components/bill/Info'
import BillActions from '../components/bill/Actions'
import BillVotes from '../components/bill/Votes'

const BillPage = (props) => {
  const {
    bill,
    sponsor,
  } = props.pageContext
  const {
    identifier, title, status,
    lawsUrl, articles, actions,
  } = bill
  return <div>
    <SEO 
      title={`${identifier}: ${title}`}
      description={`Bill details, sponsor, text, procedural status and more.`}
    />
    <Layout>
      <h1>{identifier}: {title}</h1>

      <div><BillStatus status={status} identifier={identifier} /></div>

      <hr />

      <BillInfo bill={bill} sponsor={sponsor}/>

      <Text paragraphs={bill.annotation} />
      
      {
        (articles.length > 0) && <div>
          <h3 id="mtfp-articles">News coverage</h3>
          <div>MTFP stories about the bill</div>
          <LinksList articles={articles}/>
        </div>
      }

      <Newsletter />

      <BillActions actions={actions} lawsUrl={lawsUrl}/>

      {/* <BillVotes actions={actions}/> */}
      
      <ContactUs />
    </Layout>
  </div>;
};

// This isn't running at build time and therefore isn't actually useful
// TODO - see if it's possible to shift this sort of data structure parsing to the data processing workflow
// // Validate page data in effort to catch data parsing errors

// BillPage.propTypes = {
//   pageContext: PropTypes.exact({

//     bill: PropTypes.exact({
//       actions: PropTypes.array.isRequired,
//       annotation: PropTypes.array.isRequired,
//       articles: PropTypes.array.isRequired,
//       numArticles: PropTypes.number.isRequired,
//       chamber: PropTypes.oneOf(['house','senate']),
//       identifier: PropTypes.string.isRequired,
//       isMajorBill: PropTypes.oneOf(['yes', 'no']).isRequired, // Why is this not a bool?
//       key: PropTypes.string.isRequired,
//       label: PropTypes.string,
//       lawsUrl: PropTypes.string.isRequired,
//       fiscalNoteExpected: PropTypes.oneOf(['Yes', 'No']).isRequired, // Why is this not a bool?
//       fiscalNoteUrl: PropTypes.string,
//       legalNoteUrl:  PropTypes.string,
//       requestor: PropTypes.string,
//       secondHouseReturnIfAmendedDeadline: PropTypes.string.isRequired,
//       session: PropTypes.oneOf(['2021']),
//       sponsor: PropTypes.object.isRequired,

//       status: PropTypes.exact({
//         key: PropTypes.string.isRequired,
//         step: PropTypes.oneOf(['First chamber', 'Second chamber','Reconciliation','Through Legislature','Governor','Failed','Passed']).isRequired,
//         label: PropTypes.string.isRequired,
//         status: PropTypes.oneOf(['live','stalled','became-law']).isRequired,
//       }),
//       progress: PropTypes.exact({
//         // TODO - This data structure badly needs a rework
//         passagesNeeded: PropTypes.string, // only placeholder currently
//         finalOutcome: PropTypes.string, // some of these can be null sometimes?
//         firstChamberStatus: PropTypes.string,
//         governorStatus: PropTypes.string,
//         secondChamberStatus: PropTypes.string,
//         toFirstChamber: PropTypes.bool.isRequired,
//         outOfInitialCommittee: PropTypes.bool.isRequired,
//         toSecondChamber: PropTypes.bool.isRequired,
//         toGovernor: PropTypes.bool.isRequired,
        
//       }),
//       subjects: PropTypes.array.isRequired,
//       textUrl: PropTypes.string.isRequired,
//       title: PropTypes.string.isRequired,
//       transmittalDeadline: PropTypes.string.isRequired,
//       type: PropTypes.oneOf(['bill', 'resolution', 'joint resolution', 'referendum proposal']).isRequired,
//       voteMajorityRequired: PropTypes.oneOf(['Simple', '2/3 of Entire Legislature', '2/3 of Each House', '3/4 of Each House']).isRequired,
//     }),

//     sponsor: PropTypes.exact({
//       key: PropTypes.string,
//       district: PropTypes.shape({
//         last_election: PropTypes.string.isRequired,
//         pri_elex: PropTypes.shape({
//           leg: PropTypes.arrayOf(PropTypes.object).isRequired
//         }),
//         gen_elex: PropTypes.shape({
//           leg: PropTypes.arrayOf(PropTypes.object).isRequired,
//           gov: PropTypes.arrayOf(PropTypes.object).isRequired,
//         }),
//         locale: PropTypes.string.isRequired,
//         locale_description: PropTypes.string.isRequired,
//       }),
//       locale: PropTypes.object.isRequired,
//       name: PropTypes.string.isRequired,
//       party: PropTypes.oneOf(['R', 'D']),
//       title: PropTypes.string.isRequired,
//     }),
//   }).isRequired
  
// }

export default BillPage;