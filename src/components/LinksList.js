import React from 'react'
import { css } from '@emotion/react'

import {
    dateFormat
} from '../config/utils'

import {
    containerStyle,
    noteStyle
} from '../config/styles'

const linkContainerStyle = css`
    display: flex;
    flex-wrap: wrap;
    margin: -0.3em;
    padding: 0;
`
const linkStyle = css`
    display: block;
    background-color: #EAE3DA;
    color: #222;
    padding: 0.3em 0.5em;
    border: 1px solid #BA892D;
    margin: 0.3em;

    cursor: pointer;
    flex: 1 1 200px;
    min-width: 150px;

    :hover {
        text-decoration: none;
        color: #ce5a00;
    }

    :hover .title {
        /* color: #BA892D; */
        text-decoration: underline;
        
    }

    .dek {
        font-size: 0.8em;
        line-height: 0.9em;
        font-weight: bold;
    }

    .title {
        font-size: 1em;
        line-height: 1em;
        color: #ce5a00;
    }

    .date {
        font-size: 0.8em;
        font-style: italic;
        color: #666;
    }

`

// Handles null dates from improperly parsed links
const presentDate = date => date ? dateFormat(new Date(date)) : null

const LinksList = (props) => {
    const { articles } = props
    
    if (articles.length === 0) return <div css={containerStyle}>
        <div css={noteStyle}>No stories currently in our database.</div>
    </div> 

    return <div css={containerStyle}>
        <div css={linkContainerStyle}>
            {
                articles
                    .sort((a,b) => new Date(b.date) - new Date(a.date))
                    .map((article, i) => <Link
                        key={String(i)}
                        link={article.link}
                        // dek={article.publication}
                        title={article.title}
                        date={article.date}
                    />)
            }
        </div>
    </div>
}
export default LinksList 

const Link = (props) => {
    const { link, dek, title, date } = props
    return <a css={linkStyle} href={link}>
        <div className='dek'>{dek}</div>
        <div className='title'>{title}</div>
        <div className='date'>{presentDate(date)}</div>
    </a>
}