/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

// const { candidates, races } = require('./src/data/app-copy.json')

// TK data import + merg

// TODO: See if it makes more sense to query data file via GraphQL here

// TODO: Work data merge for bill annotations into processing step
// const { bills, lawmakers, updateDate } = require('./src/data/main.json')
const billData = require('./src/data/bills.json')
const lawmakerData = require('./src/data/lawmakers.json')
const committeeData = {} // TODO

// create pages

// Committee pages TK

exports.createPages = async({ actions: { createPage } }) => {
    lawmakerData.lawmakers.forEach(lawmaker => {
        const key = lawmaker.key
        createPage({
            path: `/lawmakers/${key}`,
            component: require.resolve('./src/templates/lawmaker.js'),
            context: {
                updateDate: lawmakerData.updateDate,
                lawmaker 
            },
        })
    })
    
    billData.bills.forEach(bill => {
        const key = bill.key
        createPage({
            path: `/bills/${key}`,
            component: require.resolve('./src/templates/bill.js'),
            context: {
                updateDate: billData.updateDate,
                bill
            },
        })
    })
}