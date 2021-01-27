import React from "react"

import Layout from '../components/Layout'
import SEO from '../components/seo'

import Text from '../components/Text'


import { about } from '../data/summary.json'

const About = () => {
  return <div>
    <SEO title="About" />
    <Layout>

      <h1>About this project</h1>
      <Text paragraphs={about.description} />
    </Layout>
  </div>
}

export default About