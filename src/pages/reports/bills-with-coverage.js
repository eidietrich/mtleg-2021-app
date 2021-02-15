import React from "react"
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import BillTable from '../../components/BillTable'

const LegalNoteReport = ({ data }) => {
    const bills = data.bills.edges.map(d => d.node)
    return <div>
        <SEO
            title="Bills with MTFP coverage"
            description=""
        />
        <Layout>
            <h1>Bills with coverage</h1>
            <BillTable bills={bills} displayLimit={100}
                sortFunction={(a,b) => b.numArticles - a.numArticles}
            />

        </Layout>
    </div>
}

export const query = graphql`
  query BillsWithCoverage {
  bills: allBillsJson(filter: {numArticles: {gt: 0}}) {
    edges {
      node {
        key
        identifier
        title
        type
        status {
          key
          step
          label
          status
        }
        label
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
}

`

export default LegalNoteReport