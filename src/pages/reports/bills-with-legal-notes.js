import React from "react"
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import BillTable from '../../components/BillTable'

const LegalNoteReport = ({data}) => {
  const bills = data.bills.edges.map(d => d.node)
  return <div>
    <SEO
      title="Bills with legal notes"
      description=""
    />
    <Layout>
      <h1>Bills with legal notes</h1>
      <div>Legal notes obtained by Montana Free Press via records request</div>

      <BillTable bills={bills} />

    </Layout>
  </div>
}

export const query = graphql`
  query BillsWithLegaNotes {
  bills: allBillsJson(filter: {legalNoteUrl: {ne: null}}) {
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