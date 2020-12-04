import React from "react";

import Text from '../components/Text'

import BillInfo from '../compositions/BillInfo'
import BillActions from '../compositions/BillActions'
import BillCoverage from '../compositions/BillCoverage'

const BillPage = props => {
  const {
    // key,
    bill,
} = props.pageContext
  console.log(bill)
  return <div>
    <h1>{bill.identifier}: {bill.title}</h1>
    <BillInfo {...bill}/>
    <Text paragraphs={bill.annotation} />
    <BillActions actions={bill.actions}/>
    <BillCoverage articles={bill.articles}/>
  </div>;
};

export default BillPage;