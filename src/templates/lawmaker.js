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
    lawmaker,
} = props.pageContext
  // console.log(lawmaker)
  return <div>
    <SEO title="TK" />
    <Layout>
      <h1>{lawmaker.title} {lawmaker.name}</h1>
      <LawmakerInfo {...lawmaker}/>
      <Text paragraphs={lawmaker.annotation} />
      <LawmakerBills bills={lawmaker.bills}/>
      <LawmakerVotes lastName={lawmaker.lastName} votes={lawmaker.votes}/>
      <LawmakerCoverage articles={lawmaker.articles}/>
    </Layout>
  </div>;
};

export default LawmakerPage;