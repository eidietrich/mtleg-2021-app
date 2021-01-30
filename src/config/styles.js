// Central storage point for reused styles
import { css } from '@emotion/react'

export const containerStyle = css`
    max-width: 1200px;
    width: 100%;
    padding: 0.5em 0;
`

export const noteStyle = css`
    font-style: italic;
    font-size: 0.9em;
    margin-bottom: 0.3em;
    margin-top: 0.3em;
`

export const tableStyle = css`
    width: 100%;
    margin-top: 0.5em;
    thead {
        
    }
    tbody {
        border-top: 1px solid #ddd;
        background-color: #eae3da;
    }
    tr {
        /* border-bottom: 1px solid #ddd; */
        border-bottom: 1px solid #473d29;
        margin: 0 0.2em;

        :first-of-type {
            border-top: 1px solid #473d29;
        }
    }
    td {
        padding: 0.5em 0.5em;
    }
    th {
        font-weight: normal;
        font-style: italic;
        vertical-align: bottom;
        padding: 0.3em 0.5em;
    }
`
export const cellCenteredStyle = css`
    text-align: center;
`