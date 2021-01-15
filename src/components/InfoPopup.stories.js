import React from 'react';

import InfoPopup from './InfoPopup';

export default {
  title: 'Components/InfoPopup',
  component: InfoPopup,
};

const Template = (args) => <div>
    <InfoPopup {...args} />
</div>

export const Simple = Template.bind({});
Simple.args = {
    label: 'More information',
    children: <div>This is a child element with one line of content.</div>,
};

export const MultiGraf = Template.bind({});
MultiGraf.args = {
    label: 'More information',
    children: <div>
        <p>This is a first line. With some more stuff.</p>
        <p>This here is another line. And another.</p>
    </div>
};