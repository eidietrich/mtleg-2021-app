import React from 'react';
import PropTypes from "prop-types"

/*
Design needs needs:
- Bill status indicator
- How to display bill text/fiscal notes?
- Title here or in bill proper?

Data structure:
{
  title
  status (categorical text)
  sponsor
  lawsUrl
  textUrl
  fiscalNoteUrl (or null)
  legalNoteUrl (or null)
}

*/

const BillInfo = ({identifier, title, status, sponsor, lawsUrl, textUrl, fiscalNoteUrl, legalNoteUrl}) => {
  return <div>
      <div>Status: {status} [FLESH THIS OUT]</div>
      <div>Sponsor: <a href="#">{sponsor}</a></div>

      <div><a href={lawsUrl}>Official bill page</a> in Montana LAWS database.</div>
      {
        textUrl ? 
        <div><a href={textUrl}>Full text</a> of bill.</div>
        : <div>Bill text currently unavailable.</div>
      }
      {
        fiscalNoteUrl ? 
        <div><a href={fiscalNoteUrl}>Fiscal note</a> analyzing bill's budget impact.</div>
        : <div>No fiscal note analyzing bill's budget impact on file</div>
      }
      {
        legalNoteUrl ? 
        <div><a href={legalNoteUrl}>Legal note</a> analyzing bill's legal implications.</div>
        : <div>No legal note on file</div>
      }
  </div>
};

BillInfo.propTypes = {
  identifier: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  sponsor: PropTypes.string.isRequired,
  lawsUrl: PropTypes.string.isRequired,
  textUrl: PropTypes.string,
  fiscalNoteUrl: PropTypes.string,
  legalNoteUrl: PropTypes.string,
}

export default BillInfo