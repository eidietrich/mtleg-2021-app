import React, { Component } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import DistrictMatcher from '../js/DistrictMatcher'

const addressForm = css`
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 1rem;
`
const textInput = css`
    /* color: red; */
    /* min-width: 20rem; */
    margin: -1px;
    flex: 4 1 15rem;
    height: 2em;
`
const searchButton = css`
    margin: -1px;
    flex: 1 1 auto;
`
const message = css`
    font-style: italic;
    font-size: 0.8em;
`

const resultContainer = css`
    display: flex;
    flex-wrap: wrap;
    margin: -0.5em;
`
const resultItem = css`
    flex: 1 1 190px;
    margin: 0.5em;
    border: 1px solid #ddd;
    padding: 0.5em;
`
const resultLabel = css`
    font-weight: bold;
`
const resultName = css``


const defaultAddress = 'e.g. 1301 E 6th Ave, Helena'
class DistrictLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            matchedAddress: null,
            errorMessage: null,
            representative: null,
            senator: null,
        }

        this.districtMatcher = new DistrictMatcher()

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleFailedSubmit = this.handleFailedSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleResult = this.handleResult.bind(this)
    }
    handleChange(event) {
        this.setState({ value: event.target.value })
    }

    handleSubmit(event) {
        event.preventDefault()
        // console.log('Submit address', this.state.value)
        this.districtMatcher.matchAddressToLawmakers(this.state.value, this.handleResult, this.handleFailedSubmit)
    }

    handleResult({ hd, sd, location }) {
        const lawmakers = this.props.lawmakers
        const representative = lawmakers.find(lawmaker => lawmaker.district.key.replace(' ', '') === hd)
        const senator = lawmakers.find(lawmaker => lawmaker.district.key.replace(' ', '') === sd)
        console.log('rep', representative)
        this.setState({
            matchedAddress: `TK wire this up`,
            errorMessage: null,
            representative,
            senator,
        })
    }

    handleFailedSubmit() {
        this.setState({
            errorMessage: 'Not a valid Montana address',
            matchedAddress: null,
            representative: null,
            senator: null,
        })
    }

    render() {
        const { representative, senator, errorMessage } = this.state
        return <div>
            <div>Enter address</div>
            <div css={addressForm}>
                <input css={textInput} type="address" value={this.state.value}
                    onChange={this.handleChange}
                    placeholder={defaultAddress} />
                <button css={searchButton} onClick={this.handleSubmit}>Look up</button>
            </div>
            <div>{errorMessage}</div>
            <div css={resultContainer}>
                {
                    representative ? <LawmakerEntry lawmaker={representative} subtitle="House District"/> : null
                }
                {
                    senator ? <LawmakerEntry lawmaker={senator} subtitle="Senate District"/> : null
                }
            </div>
        </div>


    }

}

const LawmakerEntry = ({ lawmaker, subtitle }) => {
    const { key, title, name, party, district, residence } = lawmaker
    const districtKey = district.key
    return <div css={resultItem}>
        <div>{subtitle}</div>
        <div css={resultLabel}>{districtKey}</div>
        <div css={resultName}>
            <Link to={`/lawmakers/${key}`}>{title} {name}</Link>
        </div>
        <div>({party}-{residence})</div>
    </div>
}

export default DistrictLookup