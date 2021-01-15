import React from 'react';

import BillStatus from './BillStatus';

import bills from '../data/bills.json'

// Need to match /processs/config

const colors = {
  live:'#fcee59',
  stalled: '#fc8d59',
  approved: '#91cf60',
}

const BILL_STATUSES = [

  // first-house
  { key: 'In First House--Introduced', step: 'first-house', label: 'Introduced', color: colors.live },
  { key: 'In First House Committee--Nontabled', step: 'first-house', label: 'Before Committee', color: colors.live },
  { key: 'In First House Committee--Tabled', step: 'first-house', label: 'Tabled', color: colors.stalled },
  { key: 'In First House--Out of Committee', step: 'first-house', label: 'On floor', color: colors.live },
  { key: 'In First House--Through 2nd Reading', step: 'first-house', label: 'Passed initial floor vote', color: colors.live },
  { key: 'In First House--Through 3rd Reading', step: 'first-house', label: 'Passed final floor vote', color: colors.live },
  
  // second-house
  { key: 'Transmitted to Second House', step: 'second-house', label: 'En route', color: colors.live },
  { key: 'In Second House Committee--Nontabled', step: 'second-house',  label: 'Before committee', color: colors.live },
  { key: 'In Second House Committee--Tabled', label: 'Tabled', color: colors.stalled },
  { key: 'In Second House--Out of Committee', step: 'second-house', label: 'On floor', color: colors.live },
  { key: 'In Second House--Through 2nd Reading', step: 'second-house', label: 'Passed initial floor vote', color: colors.live },
  { key: 'In Second House--Through 3rd Reading', step: 'second-house', label: 'Passed final floor vote', color: colors.live },

  // reconciliation
  { key: 'Returned to First House with Second House Amendments', step: 'reconciliation', label: 'Considering 2nd chamber amendments', color: colors.live },
  { key: 'In Process to Consider Second House Amendments', step: 'reconciliation', label: 'Considering 2nd chamber amendments', color: colors.live },
  { key: 'In Conference or Free Conference Committee Process', step: 'reconciliation', label: 'In conference committee', color: colors.live },

  // governor's desk
  { key: 'Passed By Legislature--Enrolling and Final Preparation Process', step: 'governor', label: 'En route', color: colors.live },
  { key: 'Transmitted to Governor', step: 'governor', label: 'On desk', color: colors.live },
  { key: 'Returned With Governor\'s Proposed Amendments or Line Item Veto', step: 'governor', label: 'Governor suggestions made', color: colors.live },
  { key: 'In Process to Consider Governor\'s Proposed Amendments or Line Item Veto', step: 'governor', label: 'Gov. suggestions under consideration', color: colors.live },
  { key: 'In Process to Attempt Override of Governor \'s Veto', step: 'governor', label: 'Veto override attempt in progress', color: colors.live },

  // Final markers --> complicate things
  { key: 'Probably Dead', label: 'Probably Dead', step: 'final', color: colors.stalled },
  { key: 'Became Law', label: 'Became Law', step: 'final', color: colors.approved },
]

export default {
  title: 'Components/BillStatusTracker',
  component: BillStatus,
};

const Template = (args) => <div>
  <div>{bill.identifier} ({bill.session}): {bill.title} </div>
  <BillStatus {...args} />
</div>

const bill = bills[61]
console.log(bill.identifier, bill.title)


export const Default = Template.bind({});
Default.args = {
    identifier: bill.identifier,
    type: bill.type,
    status: bill.status,
    progress: bill.progress,
};

// export const Tabled = Template.bind({});
// Tabled.args = {
//     identifier: 'HB 22',
//     status: BILL_STATUSES[6]
// };

// export const SecondHouse = Template.bind({});
// SecondHouse.args = {
//   identifier: 'HB 22',
//     status: BILL_STATUSES[6]
// };

// export const Reconciliation = Template.bind({});
// Reconciliation.args = {
//   identifier: 'HB 22',
//     status: BILL_STATUSES[12]
// };

// export const BeforeGov = Template.bind({});
// BeforeGov.args = {
//   identifier: 'HB 22',
//     status: BILL_STATUSES[16]
// };

// export const BecameLaw = Template.bind({});
// BecameLaw.args = {
//   identifier: 'HB 22',
//     status: BILL_STATUSES.slice(-1)[0]
// };

// export const ProbablyDead = Template.bind({});
// ProbablyDead.args = {
//   identifier: 'HB 22',
//     status: BILL_STATUSES.slice(-2)[0]
// };


