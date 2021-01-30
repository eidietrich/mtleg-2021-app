import React from "react"
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import BillTable from '../components/BillTable'
import InfoPopup from '../components/InfoPopup'
import Newsletter from '../components/Newsletter'
import ContactUs from '../components/ContactUs'

import BillStatusOverview from '../components/overview/BillStatuses'
import BillLookup from '../components/input/BillLookup'
import LawmakerLookup from '../components/input/LawmakerLookup'
import DistrictLookup from '../components/input/DistrictLookup'

import { dateFormatLong } from '../config/utils'

import { summary, mostRecentActionDate, infoPopups } from '../data/summary.json'

const Index = ({ data }) => {
  const keyBills = data.keyBills.edges.map(d => d.node)
  const allBills = data.allBills.edges.map(d => d.node)
  const allLawmakers = data.allLawmakers.edges.map(d => d.node)
  return <div>
    <SEO title="Overview" />
    <Layout>
      <h2>The session as of {dateFormatLong(new Date(mostRecentActionDate))}</h2>

      <BillStatusOverview summary={summary} mostRecentActionDate={mostRecentActionDate} />

      <InfoPopup info={infoPopups.find(d => d.key === 'bill-process')} />

      <h2 id="key-bill-status">Key bills</h2>
      <div className="note">Major legislation identified by MTFP reporters. Where ambiguous, official bill titles are annotated with plain language summaries.</div>
      <BillTable bills={keyBills} displayLimit={15}/>
      
      <Newsletter />

      <h3 id="find-bill">Find a bill</h3>
      <BillLookup bills={allBills} />

      <h3 id="find-lawmaker">Find a lawmaker</h3>
      <LawmakerLookup lawmakers={allLawmakers} />

      <h3 id="find-district">Find your district</h3>
      <DistrictLookup lawmakers={allLawmakers} />

      <ContactUs />
    </Layout>
  </div>
}

export const query = graphql`
  query IndexPageQuery {
      keyBills: allBillsJson (filter: {isMajorBill: {eq: "yes"}}){
      edges {
      node {
          title
          identifier
          status {
            key
            step
            label
            status
          }
          label
        }
      }
    }
    allLawmakers: allLawmakersJson {
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
        }
      }
    }
    allBills: allBillsJson {
      edges {
      node {
          key
          title
          identifier
        }
      }
    }
  }
  
`

export default Index