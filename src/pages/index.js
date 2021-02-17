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

const keyBillCategories = [
  "Governor’s budget",
  "Democratic alternatives",
  "COVID-19 response",
  "Broadband internet access",
  "Election administration",
  "Health care policy",
  "Labor policy",
  "Justice policy",
  "Education policy",
  "Energy & natural resource policy",
  "Firearm regulations",
  "Anti-abortion measures",
  "Transgender restrictions",
]

const Index = ({ data }) => {
  const keyBills = data.keyBills.edges.map(d => d.node)
  const billIndex = data.billIndex.edges.map(d => d.node)
  const lawmakerIndex = data.lawmakerIndex.edges.map(d => d.node)

  // const keyBillCategories = Array.from(new Set(keyBills.map(d => d.majorBillCategory)))
  return <div>
    <SEO title="Overview" />
    <Layout>
      <h2>The session as of {dateFormatLong(new Date(mostRecentActionDate))}</h2>

      <BillStatusOverview summary={summary} mostRecentActionDate={mostRecentActionDate} />

      <InfoPopup info={infoPopups.find(d => d.key === 'bill-process')} />

      <h2 id="key-bill-status">Key bills</h2>
      <div className="note">Major legislation identified by MTFP reporters. Where ambiguous, official bill titles are annotated with plain language summaries.</div>
      {
        keyBillCategories.map(cat => {
          const billsInCat = keyBills.filter(d => d.majorBillCategory === cat)
          return <div key={cat}>
            <h4>{cat}</h4>
            <BillTable bills={billsInCat} displayLimit={15} suppressCount={true}/>
          </div>
        })
      }
      
      
      
      <Newsletter />

      <h3 id="find-bill">Find a bill</h3>
      <BillLookup bills={billIndex} />

      <h3 id="find-lawmaker">Find a lawmaker</h3>
      <LawmakerLookup lawmakers={lawmakerIndex} />

      <h3 id="find-district">Find your district</h3>
      <DistrictLookup lawmakers={lawmakerIndex} />

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
          majorBillCategory
          textUrl
          fiscalNoteUrl
          legalNoteUrl
          numArticles
          sponsor {
            name
            district
            party
          }
        }
      }
    }
    lawmakerIndex: allLawmakersJson {
      edges {
        node {
          key
          title
          name
          phone
          email
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
    billIndex: allBillsJson {
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