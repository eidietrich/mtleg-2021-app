import React from "react"

import Layout from '../components/Layout'
import SEO from '../components/Seo'
import Text from '../components/Text'

import { about } from '../data/summary.json'

const About = () => {
  return <div>
    <SEO title="About" />
    <Layout>

      <h1>About this project</h1>
      <Text paragraphs={about.description} />

      <h3>Feature updates and bug fixes</h3>
      <ul>
        <li>Jan. 27 - Lawmaker location descriptions were updated to correct errors where non-Helena lawmakers had listed a Helena mailing address on the official legislative roster. Location descriptors, e.g., "D-Helena," were also generally updated to reflect place of representation instead of place of residence for lawmakers who don't live in one of their district's major communities.</li>
      </ul>
    </Layout>
  </div>
}

export default About