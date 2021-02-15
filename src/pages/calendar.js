import React from "react"

import Layout from '../components/Layout'
import SEO from '../components/Seo'
// import Text from '../components/Text'
import ContactUs from '../components/ContactUs'
import Newsletter from '../components/Newsletter'
import UpcomingHearings from '../components/overview/UpcomingHearings'
// import UpcomingFloorActions from '../components/overview/UpcomingFloorActions'

const Calendar = () => {
    return <div>
        <SEO
            title="Calendar"
            description="Upcoming bill hearings"
        />
        <Layout>
            
            <h2 id="upcoming-bill-hearings">Upcoming bill hearings</h2>
            <UpcomingHearings />

            {/* <h2 id="upcoming-floor-actions">Scheduled floor actions</h2>
            <UpcomingFloorActions /> */}

            <Newsletter />

            <ContactUs />

        </Layout>
    </div>
}
export default Calendar