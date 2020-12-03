import React from "react"

import Layout from '../components/Layout'
import SEO from "../components/seo"
import Text from '../components/Text'

import { house } from '../data/temp-app-text.json'


const House = () => {
  return <div>
      <SEO title="Montana House" />
      <Layout>
        <Text paragraphs={house.description} />
      </Layout>
    </div>
}

export default House