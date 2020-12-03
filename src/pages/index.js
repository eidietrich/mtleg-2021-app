import React from "react"

import Layout from '../components/Layout'
import SEO from "../components/seo"

import KeyBills from '../compositions/OverviewKeyBills'
import VotingPatterns from '../compositions/OverviewVotingPatterns'

const Index = () => {
  return <div>
      <SEO title="The 2021 Montana Legislature" />
      <Layout>
        <KeyBills />
        <VotingPatterns />
      </Layout>
    </div>
}

export default Index