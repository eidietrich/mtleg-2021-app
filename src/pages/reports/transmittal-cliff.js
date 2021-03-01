import React from "react"
import { graphql } from 'gatsby'

import Layout from '../../components/Layout'
import SEO from '../../components/Seo'
import BillTable from '../../components/BillTable'
import StatusTest from '../../components/StatusTest'

const LegalNoteReport = ({ data }) => {
    const bills = data.bills.edges.map(d => d.node)

    const resolutions = bills.filter(d => ['resolution', 'joint resolution'].includes(d.type))
    const nonResolutionBills = bills.filter(d => !['resolution', 'joint resolution'].includes(d.type))

    const billsWithMarch3Transmittal = nonResolutionBills.filter(d => d.transmittalDeadline === "03/03/2021")
    const billsWithLaterTransmittal = nonResolutionBills.filter(d => d.transmittalDeadline !== "03/03/2021")
    
    const pastInitialChamber = d => (d.progression.status.firstChamberThirdReading === '3rd Reading Passed')
    const notPastInitialChamber = d => (d.progression.status.firstChamberThirdReading !== '3rd Reading Passed')

    const introduced = d => d.status.key === 'In First House--Introduced'
    const inCommiteeLive = d => d.status.key === 'In First House Committee--Nontabled'
    const inCommiteeTabled = d => d.status.key === 'In First House Committee--Tabled'
    const outOfCommittee = d => d.status.key === 'In First House--Out of Committee'
    const pastSecondReading = d => d.status.key === 'In First House--Through 2nd Reading'
    const probablyDeadAlready = d => d.status.key === 'Probably Dead'

    const billsPastInitialChamber =  billsWithMarch3Transmittal.filter(pastInitialChamber)
    const billslInInitialChamber = billsWithMarch3Transmittal.filter(notPastInitialChamber)

    // const introductionDates = [...new Set(billsWithMarch3Transmittal.map(d => d.progression.dates.introduction))]
    //     .sort((a,b) => new Date(a) - new Date(b))

    // const demBills = d => d.sponsor.party === 'D'
    // const gopBills = d => d.sponsor.party === 'R'
    
    // const billsIntroducedSinceFeb17 = billsWithMarch3Transmittal.filter(d => new Date(d.progression.dates.introduction) >= new Date('2/17/21'))
    // const billsIntroducedSinceFeb17Dems = billsIntroducedSinceFeb17.filter(demBills)
    // const billsIntroducedSinceFeb17GOP = billsIntroducedSinceFeb17.filter(gopBills)

    // const hearingDates = [...new Set(hearings.map(d => d.date))]
    //     .sort((a,b) => new Date(a) - new Date(b))


    return <div>
        <SEO
            title="Transmittal status"
            description=""
        />
        <Layout>
            {/* <ul>
                {
                    introductionDates.map(date => {
                        const genBillsOnDate = billsWithMarch3Transmittal.filter(d => d.progression.dates.introduction === date)
                        return <li>{date}: {genBillsOnDate.length} ({genBillsOnDate.filter(gopBills).length} R; {genBillsOnDate.filter(demBills).length} D)</li>
                    })
                }
            </ul>
            <div>Gen bills: {billsWithMarch3Transmittal.length}</div>
            <div>Since Feb. 17: {billsIntroducedSinceFeb17.length}</div>
            <div>Dem. bills since Feb. 17: {billsIntroducedSinceFeb17Dems.length}</div>
            <div>GOP. bills since Feb. 17: {billsIntroducedSinceFeb17GOP.length}</div>

            <h3>Hearing counts</h3>

            <ul>
                {
                    hearingDates.map(date => {
                        const hearingsOnDate = hearings.filter(d => d.date === date)
                        return <li>{date}: {hearingsOnDate.length}</li>
                    })
                }
            </ul>
            <h3>House Judiciary alone</h3>
            <ul>
                {
                    hearingDates.map(date => {
                        const hearingsOnDate = hearings
                            .filter(d => d.committee.name === 'House Judiciary')
                            .filter(d => d.date === date)
                        return <li>{date}: {hearingsOnDate.length}</li>
                    })
                }
            </ul> */}

            <h1>Bills with March 3 transmittal deadline</h1>
            <div>{billsWithMarch3Transmittal.length} bills. {resolutions.length} resolutions not shown.</div>
            

            <h2>Bills in limbo before March 3 deadline ({billslInInitialChamber.length})</h2>
            
            <h3>March 3 deadline bills introduced</h3>
            <BillTable bills={billslInInitialChamber.filter(introduced)} displayLimit={5}/>

            <h3>March 3 deadline bills in committee, live (awaiting votes)</h3>
            <BillTable bills={billslInInitialChamber.filter(inCommiteeLive)} displayLimit={5}/>

            <h3>March 3 deadline bills stalled in committee</h3>
            <BillTable bills={billslInInitialChamber.filter(inCommiteeTabled)} displayLimit={5}/>

            <h3>March 3 deadline bills out of committee, awaiting second readings</h3>
            <BillTable bills={billslInInitialChamber.filter(outOfCommittee)} displayLimit={5}/>

            <h3>March 3 deadline bills awaiting third readings</h3>
            <BillTable bills={billslInInitialChamber.filter(pastSecondReading)} displayLimit={5}/>
            
            
            <h3>March 3 deadline bills voted down</h3>
            <BillTable bills={billslInInitialChamber.filter(probablyDeadAlready)} displayLimit={5}/>
            
            <hr />
            <h2>March 3 deadline bills passed by first chamber ({billsPastInitialChamber.length})</h2>
            
            <BillTable bills={billsPastInitialChamber} />

            <hr />
            <h1>Bills with later transmittal deadline</h1>
            {billsWithLaterTransmittal.length} bills
            <BillTable bills={billsWithLaterTransmittal} />

        </Layout>
    </div>
}

export const query = graphql`
  query March3Transmittal {
  bills: allBillsJson {
    edges {
      node {
        key
        identifier
        title
        type
        transmittalDeadline
        status {
          key
          step
          label
          status
        }
        progression {
            dates {
                introduction
                initialHearing
                firstCommitteeVote
                firstChamberSecondReading
                firstChamberThirdReading
            }
            status {
                firstCommitteeName
                firstCommitteeAction
                firstChamberSecondReading
                firstChamberThirdReading
            }
        }
        label
        textUrl
        fiscalNoteUrl
        legalNoteUrl
        numArticles
        sponsor {
          name
          district
          party
        }
      }
    }
  }
}

`

export default LegalNoteReport