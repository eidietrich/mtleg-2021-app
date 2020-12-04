import React from "react"

import Layout from '../components/Layout'
import SEO from "../components/seo"
import Text from '../components/Text'

import { text } from '../data/senate.json'

const House = () => {
  return <div>
      <SEO title="Montana Senate" />
      <Layout>
        <Text paragraphs={text.description} />
      </Layout>
    </div>
}

export default House