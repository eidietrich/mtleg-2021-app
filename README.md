# Montana Free Press 2021 Capitol Tracker - Front End

Front end web app for MTFP 2021 Capitol Tracker project. Built with [GatsbyJS](https://www.gatsbyjs.com/).

Live version in production: https://apps.montanafreepress.org/capitol-tracker-2021

Data processing framework: https://github.com/eidietrich/mtleg-2021-framework

## Commands

- `npm start` - Spin up development server
- `npm run build` - Build production version of site to /public
- `npm run storybook` - Spin up Storybook server

## Storybook server

Visual unit testing with [Storybook](https://storybook.js.org/). Only implemented for interactive or reusable components. Because of Gatsby/Storybook integration quirks, it's easier to preview full pages via the Gatsby development server.

## Data validation

Using React [prop-type](https://www.npmjs.com/package/prop-types) checking to verify data passed to bill pages doesn't have unexpected surprises. Currently doing all checks at page level — may be more elegant to run checks on structure toward bottom of data hierachy in components where data is used, but that makes data structure less self-documenting.

TODO - figure out a different approach here, since it turns out that Gatsby doesn't seem to do a bulk test of prop-types for templated pages.

TODO - wire this up for lawmaker pages too?

## App major component structure

One-off pages, in `src/pages/`
- Index (Overview), `/index`
  - BillStatuses
  - BillLookup
  - LawmakerLookup
  - DistrictLookup
- House, `/house` - Montana House info
  - ChamberLeadership
  - Roster
    - LawmakerTable
- Senate, `/senate` - Montana Senate info
  - Symmetric to House page
- Governor, `/governor` - Montana Governor info
- About, `/about` - About page + changelog

Templated pages (one for each data item), in `src/templates/`
- Bills `/bills/{identifierKey}` - Each bill/resolution introduced in the 2021 Legislature
  - Status
  - Info
  - Actions
- Lawmakers `/lawmakers/{nameKey}` - Each rep/senator
  - Portrait
  - ElectionHistory
  - Committes
  - VotingSummary

Other things in `/src` folder
- config - Sitewide css, config objects, data styling functions, etc.
- js - complex logic
- images - images
- stories - Storybook files