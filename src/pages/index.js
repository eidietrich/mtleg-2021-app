import React from "react"
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import BillTable from '../components/BillTable'
import Text from '../components/Text'
import BillStatusOverview from '../components/BillStatusOverview'
import InfoPopup from '../components/InfoPopup'

import BillLookup from '../compositions/BillLookup'
import LawmakerLookup from '../compositions/LawmakerLookup'
import DistrictLookup from '../compositions/DistrictLookup'



import { summary, about, mostRecentActionDate } from '../data/summary.json'

const Index = ({ data }) => {
  const keyBills = data.keyBills.edges.map(d => d.node)
  const allBills = data.allBills.edges.map(d => d.node)
  const allLawmakers = data.allLawmakers.edges.map(d => d.node)
  return <div>
    <SEO title="The 2021 Montana Legislature" />
    <Layout>
      <BillStatusOverview summary={summary} mostRecentActionDate={mostRecentActionDate} />
      <InfoPopup label="How bills move through the Legislature">
        <div>In order to become law, bills must be passed by their sponsor's chamber and then the other side of the Legislature. Bills passed by both houses must be reconciled if they've passed in different forms and then transmitted to the governor. The governor can sign a bill, issue a veto, or let bills become law without his signature. Lawmakers can override vetos with two-thirds majorities in both chambers.</div>
        <div>Standard House and Senate resolutions are reviewed by their respective chamber. Joint resolutions must be passed by both. Neither type of resolution requires action by the governor.</div>
      </InfoPopup>

      <h3 id="key-bill-status">Key bills</h3>
      <div>Status of major legislation identified by MTFP reporters</div>
      <BillTable bills={keyBills} />
      

      <h3 id="find-bill">Find a bill</h3>
      <BillLookup bills={allBills} />

      <h3 id="find-lawmaker">Find a lawmaker</h3>
      <LawmakerLookup lawmakers={allLawmakers} />

      <h3 id="find-district">Find your district</h3>
      <DistrictLookup lawmakers={allLawmakers} />

      <h3 id="about">About this project</h3>
      <Text paragraphs={about.description} />
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
          residence
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

// TODO - Add page query for data necessary