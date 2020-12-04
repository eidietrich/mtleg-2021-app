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
`
const linkStyle = css`
    display: block;
    color: #222;
    margin-bottom: 0.5rem;
    padding: 0 0.3rem;
    border-left: 3px solid #222;

    cursor: pointer;
    flex: 1 0 33%;
    min-width: 150px;

    :hover {
        text-decoration: none;
        color: #BA892D;
        border-left: 3px solid #BA892D;
    }

    :hover .title {
        color: #BA892D;
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
        color: #ae9864;
    }

`
const featuredStyle = css`
    background: #222;
    color: #fff;

    :hover {
        background: #2800d7;
        color: #fff;
    }
`


// Handles null dates from improperly parsed links
const presentDate = date => date ? dateFormat(new Date(date)) : null

// TODO: Break this into data processing step
const dedupeTitles = (links) => {
    const sorted = links.sort((a,b) => new Date(b.date) - new Date(a.date))
    const uniqueTitles = Array.from(new Set(sorted.map(d => d.title)))
    return uniqueTitles.map(title => sorted.find(d => title === d.title))
}

const LinksList = (props) => {
    const { links, featuredFilter } = props
    
    if (links.length === 0) return <div css={containerStyle}>
        {/* <h2>Media coverage</h2> */}
        <div css={noteStyle}>No stories currently in our database.</div>
    </div> 

    const deduped = dedupeTitles(links)

    return <div css={containerStyle}>
        {/* <div css={noteStyle}>Stories tracked in our database of 2021 legislative coverage.</div> */}
        <br/>
        <div css={linkContainerStyle}>
            {
                deduped
                    .filter(featuredFilter)
                    .sort((a,b) => new Date(b.date) - new Date(a.date))
                    .map((link, i) => <FeaturedLink 
                        key={String(i)}
                        url={link.url}
                        dek={link.publication}
                        title={link.title}
                        date={link.date}
                    />)
            }
            {
                deduped
                    .filter((d) => !featuredFilter(d)) // invert
                    .sort((a,b) => new Date(b.date) - new Date(a.date))
                    .map((link, i) => <BasicLink
                        key={String(i)}
                        url={link.url}
                        dek={link.publication}
                        title={link.title}
                        date={link.date}
                    />)
            }
        </div>
    </div>
}
export default LinksList 

const FeaturedLink = (props) => {
    const { url, dek, title, date } = props
    return <a css={[linkStyle, featuredStyle]} href={url}>
        <div className='dek'>{dek}</div>
        <div className='title'>{title}</div>
        <div className='date'>{presentDate(date)}</div>
    </a>

}

const BasicLink = (props) => {
    const { url, dek, title, date } = props
    return <a css={linkStyle} href={url}>
        <div className='dek'>{dek}</div>
        <div className='title'>{title}</div>
        <div className='date'>{presentDate(date)}</div>
    </a>
}