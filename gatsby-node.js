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
const { bills, lawmakers, updateDate } = require('./src/data/main.json')
const committees = []

// create pages

// Committee pages TK

const makeLawmakerKey = lawmaker => (lawmaker.name).replace(/\s/g, '-')
const makeBillKey = bill => bill.identifier.replace(/\s/g, '-')

exports.createPages = async({ actions: { createPage } }) => {
    lawmakers.slice(5,10).forEach(lawmaker => {
        const key = makeLawmakerKey(lawmaker)
        createPage({
            path: `/lawmakers/${key}`,
            component: require.resolve('./src/templates/lawmaker.js'),
            context: {
                key,
                updateDate,
                lawmaker 
            },
        })
    })
    
    bills.slice(50,60).forEach(bill => {
        const key = makeBillKey(bill)
        createPage({
            path: `/bills/${key}`,
            component: require.resolve('./src/templates/bill.js'),
            context: {
                key,
                updateDate,
                bill
            },
        })
    })
}