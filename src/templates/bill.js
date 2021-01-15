import React from "react";
import { css } from '@emotion/react'

import Layout from '../components/Layout'
import SEO from "../components/seo"

import Text from '../components/Text'
import BillStatus from '../components/BillStatus'
import LawmakerInline from '../components/LawmakerInline'
import ContactUs from '../components/ContactUs'
import LinksList from '../components/LinksList'


// import BillInfo from '../compositions/BillInfo'
import BillActions from '../compositions/BillActions'
import BillCoverage from '../compositions/BillCoverage'

import {
  dateFormat,
} from '../config/utils'

const infoRowCss = css`
  display: flex;
  flex-wrap: wrap;
  margin-left: -0.125em;
  margin-right: 0.125em;
`
const infoColCss = css`
  flex: 1 1 100px;
  border: 1px solid #AE9864;
  padding: 0.25em;
  margin: 0.125em;

  background-color: #EAE3DA;
`
const infoColLabelCss = css`
  font-size: 0.8em;
  text-transform: uppercase;
  /* font-weight: bold; */
  color: #736440;
  margin-bottom: 0.25em;
`
const infoColContentCss = css`
  color: #222;
  display: flex;
  align-items: center;
  height: 2.2em;
  text-align: center;
`

const BillPage = props => {
  const {
    // key,
    bill,
    sponsor,
  } = props.pageContext
  const {
    identifier, title, status, lawsUrl, textUrl, fiscalNoteUrl,
    legalNoteUrl, articles, actions,
    transmittalDeadline, secondHouseReturnIfAmendedDeadline, voteMajorityRequired
  } = bill
  return <div>
    <SEO title={`${identifier}: ${title}`} />
    <Layout>
      <h1>{identifier}: {title}</h1>

      <div><BillStatus status={status} identifier={identifier} /></div>

      <hr />

      <div>
        Sponsor: <LawmakerInline lawmaker={sponsor} />
      </div>

      <div css={infoRowCss}>
        {/* <div css={infoColCss}>
          <div css={infoColLabelCss}>
            Sponsor
          </div>
          <div css={infoColContentCss}>
            <LawmakerInline lawmaker={sponsor} />
          </div>
        </div> */}

        <div css={infoColCss}>
          <div css={infoColLabelCss}>
            Bill text
          </div>
          <div css={infoColContentCss}>
            {
              textUrl ?
                <span><a href={textUrl}>Available here</a></span>
                : <span>Not available</span>
            }
          </div>
        </div>

        <div css={infoColCss}>
          <div css={infoColLabelCss}>
            Fiscal note
          </div>
          <div css={infoColContentCss}>
            {
              fiscalNoteUrl ?
                <span><a href={fiscalNoteUrl}>Available here</a></span>
                : <span>None on file</span>
            }
          </div>
        </div>

        <div css={infoColCss}>
          <div css={infoColLabelCss}>Official bill page</div>
          <div css={infoColContentCss}>
            <a href={lawsUrl}>In LAWS system</a>
          </div>
        </div>

        {/* <div css={infoColCss}>
          <div css={infoColLabelCss}>
            Legal note
          </div>
          <div css={infoColContentCss}>
            {
              legalNoteUrl ?
                <span>Available<a href={legalNoteUrl}> here</a></span>
                : <span>None on file</span>
            }
          </div>
        </div> */}

        {/* <div css={infoColCss}>
          <div >
            <div css={infoColLabelCss}>1st chamber passage deadline:</div>
            {transmittalDeadline}
          </div>
          <div>
            <div css={infoColLabelCss}>2nd chamber passage deadline if amended:</div>
            {secondHouseReturnIfAmendedDeadline}
          </div>
        </div>

        <div css={infoColCss}>
          <div css={infoColLabelCss}>Support needed to pass:</div>
          {voteMajorityRequired}
        </div> */}

      </div>

      <div className="note">
        { (voteMajorityRequired !== 'Simple') ? <span> Passage requires supermajority, {voteMajorityRequired}. </span> : null}
        <span>Deadline for passing 1st chamber:  {dateFormat(new Date(transmittalDeadline))}. </span>
        <span>Deadline for 1st chamber return if amended in 2nd: {dateFormat(new Date(secondHouseReturnIfAmendedDeadline))}.</span>
      </div>



      {/* <div className="note">Source: <a href={lawsUrl}>Official bill page</a> in Montana LAWS database.</div> */}

      <Text paragraphs={bill.annotation} />
      
      {
        (articles.length > 0) && <div>
          <h3>News coverage</h3>
          <div>MTFP stories about the bill</div>
          <LinksList articles={articles}/>
        </div>
      }

      <BillActions actions={actions} lawsUrl={lawsUrl}/>
      
      <ContactUs />
    </Layout>
  </div>;
};

// // TODO - update this once done prototyping
// BillPage.propTypes = {
//   identifier: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   status: PropTypes.string.isRequired,
//   sponsor: PropTypes.string.isRequired,
//   lawsUrl: PropTypes.string.isRequired,
//   textUrl: PropTypes.string,
//   fiscalNoteUrl: PropTypes.string,
//   legalNoteUrl: PropTypes.string,
// }

export default BillPage;