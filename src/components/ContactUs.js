import React from 'react';
import { css } from '@emotion/react'

import Text from '../components/Text'

import { contactUs } from '../data/summary.json'

const containerCss = css`
    margin-top: 3em;
`
const ContactUs = (props) => {
    return <div className="note" css={containerCss}>
        <Text paragraphs={contactUs.description} />
    </div>
}

export default ContactUs