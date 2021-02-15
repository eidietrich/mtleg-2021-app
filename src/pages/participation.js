import { AnchorLink } from "gatsby-plugin-anchor-links"
import React from "react"

import Layout from '../components/Layout'
// import UpcomingHearings from "../components/overview/UpcomingHearings"
import SEO from '../components/Seo'
import Text from '../components/Text'

import { participation } from '../data/summary.json'

const Participate = () => {
    const {
        ledeIn,
        watchTitle,
        watchText,
        testifyTitle,
        testifyText,
        trackingTitle,
        trackingText,
        credit,

    } = participation
    return <div>
        <SEO title="Participation"
            description="What to know to weigh in on the Legislative process"
        />
        <Layout>

            <h1 id="participation">Participating in the 2021 Legislature</h1>
            <div className="note">{credit}</div>
            <Text paragraphs={ledeIn} />
            
            <h2>{watchTitle}</h2>
            <Text paragraphs={watchText} />

            <h2>{testifyTitle}</h2>
            <Text paragraphs={testifyText} />

            <h2>{trackingTitle}</h2>
            <Text paragraphs={trackingText} />

            <h2>Upcoming bill hearings</h2>
            <p>The MTFP Capitol Tracker <AnchorLink to='/calendar#upcoming-bill-hearings'>lists upcoming bill hearings here</AnchorLink>.</p>

        </Layout>
    </div>
}

export default Participate