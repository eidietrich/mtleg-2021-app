import React, { Component } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import TextInput from '../components/TextInput'

const standardize = string => string.toUpperCase().replace(' ','').replace('-','')

class LawmakerLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lawmakersFound: []
        }

        this.searchByName = this.searchByName.bind(this)
    }

    searchByName(input) {
        const { lawmakers } = this.props
        if (input.length < 3) {
            this.setState({
                lawmakersFound: []
            })
        } else {
            const filterKey = standardize(input)
            const lawmakersFound = lawmakers.filter(d => {
                // console.log(standardize(d.name))
                return standardize(d.name).includes(filterKey) 
            })
            this.setState({
                lawmakersFound
            })
        }
    }

    render() {
        const { lawmakersFound } = this.state
        return <div>
            <div css={labelCss}>Type to search by name</div>
            <TextInput
                handleInput={this.searchByName}
                placeholder='e.g. Wylie Galt'
            />
            <div css={resultContainer}>
                {
                    lawmakersFound.map(lawmaker => <LawmakerEntry key={lawmaker.key} lawmaker={lawmaker} />)
                }
                {
                    (lawmakersFound.length === 0) && <div css={placeholderCss}>Search results</div>
                }
            </div>
        </div>
    }
}

const resultContainer = css`
    display: flex;
    flex-wrap: wrap;
    /* margin: -0.5em; */

    padding-bottom: 1px;
    min-height: 8em;
    background-color: #eee;
`
const resultItem = css`
    flex: 1 1 190px;
    margin: 0.5em;
    padding: 0.5em;
    max-width: 200px;
    border: 1px solid #806F47;
    background-color: #eae3d4;
`
const placeholderCss = css`
    display: flex;
    height: 8em;
    color: #aaa;
    width: 100%;
    text-transform: uppercase;
    justify-content: center;
    align-items: center;
`
const resultLabel = css`
    font-weight: bold;
`
const resultName = css`
    font-size: 1.2em;
    font-weight: bold;
`
const labelCss = css`margin-bottom: 0.2em;`

const LawmakerEntry = ({ lawmaker }) => {
    const { key, title, name, party, district, residence } = lawmaker
    return <div css={resultItem}>
        <div css={resultLabel}>{district.key}</div>
        <div css={resultName}>
            <Link to={`/lawmakers/${key}`}>{title} {name}</Link>
        </div>
        <div>({party}-{residence})</div>
    </div>
}



export default LawmakerLookup