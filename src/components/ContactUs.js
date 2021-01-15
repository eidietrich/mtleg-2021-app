import React from 'react';
import { AnchorLink } from "gatsby-plugin-anchor-links";

const ContactUs = (props) => {
    return <div className="note">
        <hr />
        <p>More information about this guide <AnchorLink to='/#about'>is available here</AnchorLink>. Reach Data Reporter Eric Dietrich with questions, comments or bug reports for this project at <a href="mailto:edietrich@montanafreepress.org">edietrich@montanafreepress.org</a>.</p>
        <p>Think there's a potential news story to be done about a bill or lawmaker you see here? Tell us at <a href="mailto:news@montanafreepress.org">news@montanafreepress.org</a>.</p>
    </div>
}

export default ContactUs