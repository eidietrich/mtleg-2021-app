import React from 'react';

import InfoPopup from '../components/InfoPopup';

export default {
  title: 'Components/InfoPopup',
  component: InfoPopup,
};

const Template = (args) => <div>
    <InfoPopup {...args} />
</div>

export const Simple = Template.bind({});
Simple.args = {
    info: {
        label: 'More information',
        content: [
            {value: "This is a first line."}
        ],
    }
};

export const MultiGraf = Template.bind({});
MultiGraf.args = {
    info: {
        label: 'More information',
        content: [
            {value: "This is a first line. With some more stuff."},
            {value: "This here is another line. And another."}
        ],
    }
};