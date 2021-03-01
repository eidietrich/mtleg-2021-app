import React from "react"
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import { numberFormat } from '../config/utils'

import {
    tableStyle,
} from '../config/styles';

const committeeTableCss = css``

const committeeTitleCss = css`
    font-weight: bold;
    font-size: 1.2em;
`
const committeeDetailCss = css`
    font-style: italic;
    font-size: 0.9em;
`
const numberCellCss = css`
    font-weight: bold;
    font-size: 1.2em;
    text-align: center;
`
const ChamberCommittees = ({ committees }) => {
    const rows = committees
        .sort((a,b) => b.overview.billsReferred - a.overview.billsReferred)
        .map(committee => <Committee key={committee.key} committee={committee} />)
    return <div>
        <h3>Committees</h3>
        <div>Committees conduct public hearings on bills and decide which measures to forward for debate by the full chamber.</div>
        <div>
            <table css={[tableStyle, committeeTableCss]}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Bills referred</th>
                        <th>Bills heard</th>
                        <th>Bills passed to floor</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        </div>
    </div>
}

const Committee = ({ committee }) => {
    const { name, key, members, overview } = committee
    const chair = members.find(d => d.role === 'Chair')
    const { billsReferred, billsHeard, billsPassed } = overview
    return <tr>
        <td>
            <div css={committeeTitleCss}><Link to={`/committees/${key}`}>{name}</Link></div>
            <div css={committeeDetailCss}>Chair <Link to={`/lawmakers/${chair.key}`}>{chair.name}</Link>, {chair.party}-{chair.locale}</div>
        </td>
        <td css={numberCellCss}>{numberFormat(billsReferred)}</td>
        <td css={numberCellCss}>{numberFormat(billsHeard)}</td>
        <td css={numberCellCss}>{numberFormat(billsPassed)}</td>
    </tr>
}

export default ChamberCommittees