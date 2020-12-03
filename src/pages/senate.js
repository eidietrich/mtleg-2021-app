import React from "react"

import Layout from '../components/Layout'
import SEO from "../components/seo"
import Text from '../components/Text'

import { senate } from '../data/temp-app-text.json'

const House = () => {
  return <div>
      <SEO title="Montana Senate" />
      <Layout>
        <Text paragraphs={senate.description} />
      </Layout>
    </div>
}

export default House