import React from 'react';
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import {
    partyColors
} from '../config/config'

import {
    lawmakerUrl,
    percentFormat
} from '../config/utils'
import {
    tableStyle,
} from '../config/styles';

const lawmakerTableCss = css`
    max-width: 95vw;
`
const tableLinkStyle = css`
    font-weight: bold;
`
const colorGopCss = css`
    color: ${partyColors('R')};
    font-weight: bold;
`
const colorDemCss = css`
    color: ${partyColors('D')};
    font-weight: bold;
`
const partyControlCss = party => css`
    background-color: ${partyColors(party)};
    font-weight: bold;
    color: #fff;
`
const col1 = css`min-width: 3em;`
const col2 = css`
    min-width: 12em;
    @media screen and (max-width: 468px) {
        min-width: 8em;
    }
`
const col3 = css`
    min-width: 4em;
    text-align: right;
`
const col4 = css`
    min-width: 5.5em;
    text-align: right;
`
const LawmakerTable = ({ lawmakers }) => {
    const rows = lawmakers
        .map(lawmaker => <Row key={lawmaker.key} {...lawmaker} />)
    return <div>
        <table css={[tableStyle, lawmakerTableCss]}>
            <thead>
                <tr>
                    <th css={col1}>District</th>
                    <th css={col2}>Lawmaker</th>
                    <th css={col3}>Votes in majority</th>
                    <th css={col4}>
                        <div>w/ most Rs</div>
                        <div>w/ most Ds</div>
                    </th>
                </tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    </div>
};

const Row = ({ name, party, district, locale, votingSummary }) => {
    const districtLabel = district.key
    const { fractionVotesWithMajority, fractionVotesWithGopMajority, fractionVotesWithDemMajority } = votingSummary
    return (<tr key={name}>
        <td css={[col1, partyControlCss(party)]}>
            {districtLabel}
        </td>
        <td css={[col2]}>
            <div css={tableLinkStyle}><Link to={`/lawmakers/${lawmakerUrl(name)}`}>{name}</Link></div>
            <div>{party}-{locale.short}</div>
        </td>
        <td css={col3}>
            {percentFormat(fractionVotesWithMajority)}
        </td>
        <td css={col4}>
            <div>
                <span css={colorGopCss}>{percentFormat(fractionVotesWithGopMajority)}</span> w/ Rs
            </div>
            <div>
                <span css={colorDemCss}>{percentFormat(fractionVotesWithDemMajority)}</span> w/ Ds
            </div>
        </td>
    </tr>)
}



export default LawmakerTable