import React, { Component } from 'react'
import { Link } from 'gatsby'
import { css } from '@emotion/react'

import TextInput from '../components/TextInput'

const standardize = string => string.toUpperCase().replaceAll(' ','').replaceAll('-','')

class BillLookup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            billsFound: []
        }

        this.refIdInput = React.createRef()
        this.refTitleInput = React.createRef()

        this.searchByIdentifier = this.searchByIdentifier.bind(this)
        this.searchByTitle = this.searchByTitle.bind(this)
    }

    searchByIdentifier(input) {
        const { bills } = this.props
        const minSearchLength = 0
        const resultLimit = 10

        this.refTitleInput.current.reset()
        if (input.length < minSearchLength) {
            this.setState({
                billsFound: []
            })
        } else {
            const filterKey = standardize(input)
            const billsFound = bills.filter(d => {
                return standardize(d.identifier).includes(filterKey) 
            }).slice(0,resultLimit)
            this.setState({
                billsFound
            })
        }
        
    }

    searchByTitle(input) {
        const { bills } = this.props
        const minSearchLength = 3
        const resultLimit = 10

        this.refIdInput.current.reset()
        if (input.length < minSearchLength) {
            this.setState({
                billsFound: []
            })
        } else {
            const filterKey = standardize(input)
            const billsFound = bills.filter(d => {
                return standardize(d.title).includes(filterKey) 
            }).slice(0,resultLimit)
            this.setState({
                billsFound
            })
        }
    }

    render() {
        const { billsFound } = this.state
        return <div>
            <div>Search by number or bill code</div>
            <TextInput
                handleInput={this.searchByIdentifier}
                placeholder='e.g. "100" or "HB 100"'
                ref={this.refIdInput}
            />
            <div className="note">"HB" and "SB" indicate House and Senate bills, respectively. "HR" and "SR" indicate House and Senate resolutions.</div>
            <div>Search by words in bill title</div>
            <TextInput
                handleInput={this.searchByTitle}
                placeholder='e.g. "budget", "tax", or "coal"' 
                ref={this.refTitleInput}
            />
            {/* <div> [TK? Search by bill subject]</div>
            <div> [TK? Search by assigned committee]</div> */}
            
            <div css={resultContainer}>
                {
                    billsFound.map(bill => <BillEntry key={bill.key} bill={bill} />)
                }
            </div>

        </div>
    }
}

const resultContainer = css`
    /* display: flex; */
    /* flex-wrap: wrap; */
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

const BillEntry = ({ bill }) => {
    const { key, identifier, title } = bill
    return <div css={resultItem}>
        <div css={resultName}>
            <Link to={`/bills/${key}`}>{identifier}:</Link> {title}
        </div>
    </div>
}

export default BillLookup