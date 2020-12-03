import React from "react"

import Layout from '../components/Layout'
import SEO from '../components/seo'
import Text from '../components/Text'

import { governor } from '../data/temp-app-text.json'

const Governor = () => {
  return <div>
      <SEO title="Governor Greg Gianforte" />
      <Layout>
        <Text paragraphs={governor.description} />
        <h4>List of bills on governor's desk, which he's vetoed</h4>
        <h4>Media coverage of governor relevant to session</h4>
      </Layout>
    </div>
}

export default Governor