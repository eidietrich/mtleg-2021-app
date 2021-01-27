import React from "react";
import { graphql } from "gatsby"
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import SEO from "../components/seo"
import Text from '../components/Text'
import ContactUs from '../components/ContactUs'
import Newsletter from '../components/Newsletter'

import BillTable from '../components/BillTable'
import LinksList from '../components/LinksList'
import LawmakerPortrait from '../components/LawmakerPortrait'
import LawmakerElectionHistory from '../components/LawmakerElectionHistory'

import LawmakerCommittees from '../compositions/LawmakerCommittees'
// import LawmakerBills from '../compositions/LawmakerBills'
import LawmakerVotingSummary from '../compositions/LawmakerVotingSummary'
import LawmakerVotes from '../compositions/LawmakerVotes'
import LawmakerCoverage from '../compositions/LawmakerCoverage'

import {
  listToText,
} from '../config/utils'

import {
  partyColors,
} from '../config/config'

const topperBar = css`
  display: flex;
  flex-wrap: wrap;
  border: 1px solid #806F47;
  background-color: #eae3da;
  padding: 0.5em;
`
const portraitColCss = css`
  margin-right: 1em;
`
const infoCol = css`
  /* margin-left: 1em; */
  flex: 1 0 100px;
  h1 {
    font-size: 1.5em;
    margin-top: 0;
    margin-bottom: 0.1em;
  }
`
const residenceLineCss = css``
const districtLineCss = css`
  font-size: 0.9em;
`

const getPartyLabel = (key) => {
  return {
    'R': 'Republican',
    'D': 'Democrat'
  }[key]
}

const LawmakerPage = ({pageContext, data}) => {
  const {
    lawmaker
  } = pageContext
  const {
    title,
    name,
    lastName,
    party,
    chamber,
    district,
    residence,
    annotation,
    committees,
    legislativeHistory,
    votes,
    votingSummary,
    articles,
    sponsoredBills,
    imageSlug
  } = lawmaker
  // console.log(portrait)
  const { portrait } = data
  const districtLabel = district.key
  const color = partyColors(party)
  const portraitTopper = css`
    border-top: 6px solid ${color};
  `
  
  return <div>
    <SEO
      title={`${title} ${name}, ${districtLabel}`}
      description="Election history, sponsored bills, committee assignments and more."
    />
    <Layout>
      <div css={topperBar}>
        <div css={[portraitColCss, portraitTopper]}>
          <LawmakerPortrait portrait={portrait}/>
        </div>
        <div css={infoCol}>
          <h1>{title} {name}</h1>
          <div css={residenceLineCss}>{getPartyLabel(party)} of {residence}</div>
          <div css={districtLineCss}>Representing {districtLabel}</div>
          
        </div>
      </div>
      <Text paragraphs={annotation} />
      <History lastName={lastName} history={legislativeHistory} />
      

      <h3>{district.key} election results</h3>
      <LawmakerElectionHistory lawmaker={lawmaker} />

      <LawmakerVotingSummary lawmaker={lawmaker} votingSummary={votingSummary} />

      <Newsletter />

      <h3>Bills sponsored</h3>
      <BillTable bills={sponsoredBills}/>

      <h3>Committee assignments</h3>
      <ul>
          {committees.map(c => <li key={c.committee}>{c.committee}{(c.role != 'Member') ? ` - ${c.role}` : null}</li>)}
      </ul>

      {
        (articles.length > 0) && <div>
          <h3>News coverage</h3>
          <div>MTFP stories involving this lawmaker</div>
          <LinksList articles={articles}/>
        </div>
      }

      <ContactUs />

    </Layout>
  </div>;
};

export default LawmakerPage;

// TODO - clean this up, possibly export as separate component
const History = ({lastName, history}) => {
  const pastHouseSessions = history.houseSessions.map(d => d.year).sort((a,b) => b-a).filter(d => +d !== 2021)
  const pastSenateSessions = history.senateSessions.map(d => d.year).sort((a,b) => b-a).filter(d => +d !== 2021)
  if ((pastHouseSessions.length + pastSenateSessions.length) === 0) {
    return <p>2021 is the first session {lastName} has served in the Legislature.</p>
  } else if (pastSenateSessions.length === 0) {
    return <p>{lastName} previously served in the House in {listToText(pastHouseSessions)}.</p>
  } else if (pastHouseSessions.length === 0) {
    return <p>{lastName} previously served in the Senate in {listToText(pastSenateSessions)}.</p>
  } else {
    return <p>{lastName} previously served in the House in {listToText(pastHouseSessions)}, as well as the Senate in {listToText(pastSenateSessions)}.</p>
  }

}

export const query = graphql`
  query($imageSlug: String!) {
      portrait: file(relativePath: { eq: $imageSlug }) {
        childImageSharp {
          fixed(width: 100) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
`