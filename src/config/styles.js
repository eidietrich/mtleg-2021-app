// Central storage point for reused styles
import React from 'react';
import { css } from '@emotion/react'

export const containerStyle = css`
    max-width: 1200px;
    width: 100%;
    padding: 0.5rem;
`

export const noteStyle = css`
    font-style: italic;
    font-size: 0.9em;
    margin-bottom: 0.3em;
`

export const tableStyle = css`
    thead {
        background-color: #444;
        color: white;
    }
    tr {
        border-bottom: 1px solid #ddd;
    }
    tr:first-of-type {
        border-top: 1px solid #ddd;
    }
    td {
        padding: 0.1em 0.5em;
    }
    th {
        border-right: 1px solid #fff;
        padding: 0.3em 0.5em;
    }
`
export const cellCenteredStyle = css`
    text-align: center;
`