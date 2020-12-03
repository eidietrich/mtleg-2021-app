import React from "react";

import Text from '../components/Text'

import BillInfo from '../compositions/BillInfo'
import BillActions from '../compositions/BillActions'
import BillCoverage from '../compositions/BillCoverage'

const BillPage = props => {
  const {
    key,
    bill,
} = props.pageContext

  return <div>
    <h1>{bill.identifier}: {bill.title}</h1>
    <BillInfo {...bill}/>
    <h3>Annotations</h3>
    <Text paragraphs={bill.annotation} />
    <BillActions />
    <BillCoverage />
    <br />
    <div>Data:</div>
    <div>{JSON.stringify(bill)}</div>
  </div>;
};

export default BillPage;