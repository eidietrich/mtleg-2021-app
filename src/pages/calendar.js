import React from "react"
import { AnchorLink } from "gatsby-plugin-anchor-links"; 

import Layout from '../components/Layout'
import SEO from '../components/Seo'
// import Text from '../components/Text'
import ContactUs from '../components/ContactUs'
import Newsletter from '../components/Newsletter'
import UpcomingHearings from '../components/overview/UpcomingHearings'
import UpcomingFloorActions from '../components/overview/UpcomingFloorActions'

const Calendar = () => {
    return <div>
        <SEO
            title="Calendar"
            description="Upcoming bill hearings"
        />
        <Layout>
            <h1>Calendar</h1>
            <AnchorLink to="/calendar#upcoming-bill-hearings">Scheduled bill hearings</AnchorLink>
            <span> - </span>
            <AnchorLink to="/calendar#upcoming-floor-actions">Scheduled floor actions</AnchorLink>
            
            <h2 id="upcoming-bill-hearings">Scheduled bill hearings</h2>
            <UpcomingHearings />

            <h2 id="upcoming-floor-actions">Scheduled House and Senate floor actions</h2>
            <div>See also: <a href="http://laws.leg.mt.gov/legprd/laws_agendas.agendarpt?chamber=H&P_SESS=20211">Official House agendas</a>. <a href="http://laws.leg.mt.gov/legprd/laws_agendas.agendarpt?chamber=S&P_SESS=20211">Official Senate agendas</a>.</div>
            <UpcomingFloorActions />

            <Newsletter />

            <ContactUs />

        </Layout>
    </div>
}
export default Calendar