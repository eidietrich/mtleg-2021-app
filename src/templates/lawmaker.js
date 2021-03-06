import React from "react";
import { graphql } from "gatsby"
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import SEO from "../components/Seo"
import Text from '../components/Text'
import ContactUs from '../components/ContactUs'
import Newsletter from '../components/Newsletter'

import BillTable from '../components/BillTable'
import LinksList from '../components/LinksList'

import LawmakerPortrait from '../components/lawmaker/Portrait'
import LawmakerElectionHistory from '../components/lawmaker/ElectionHistory'
import LawmakerCommittees from '../components/lawmaker/Commitees'
import LawmakerVotingSummary from '../components/lawmaker/VotingSummary'

import {
  listToText,
  cleanPhoneString,
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
const localeLineCss = css`
  font-size: 0.9em;
  font-style: italic;
  color: #444;
`
const contactLineCss = css`
  font-size: 0.9em;
  margin-top: 0.4em;
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
    district,
    locale,
    annotation,
    committees,
    legislativeHistory,
    votingSummary,
    articles,
    sponsoredBills,
    phone,
    email
  } = lawmaker
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
          <div css={residenceLineCss}>{getPartyLabel(party)}</div>
          <div css={districtLineCss}>Representing {districtLabel}</div>
          <div css={localeLineCss}>{locale.long}</div>
          <div css={contactLineCss}>
            {phone && <a href={`tel:${cleanPhoneString(phone)}`}>{phone}</a>}
            {(phone && email) && <span> | </span> }
            {email && <a href={`mailto:${email}`}>{email}</a>}
          </div>
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
      <LawmakerCommittees committees={committees} />

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