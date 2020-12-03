import React from "react";

import Layout from '../components/Layout'
import SEO from "../components/seo"
import Text from '../components/Text'

import LawmakerInfo from '../compositions/LawmakerInfo'
import LawmakerBills from '../compositions/LawmakerBills'
import LawmakerVotes from '../compositions/LawmakerVotes'
import LawmakerCoverage from '../compositions/LawmakerCoverage'

const LawmakerPage = props => {
  const {
    key,
    lawmaker,
} = props.pageContext

  return <div>
    <SEO title="TK" />
    <Layout>
      <h1>{key}</h1>
      <LawmakerInfo />
      <h4>Annotations</h4>
      <Text paragraphs={lawmaker.annotation} />
      <LawmakerBills />
      <LawmakerVotes />
      <LawmakerCoverage />
      <br />
      <div>Data:</div>
      <div>{JSON.stringify(lawmaker)}</div>
    </Layout>
  </div>;
};

export default LawmakerPage;