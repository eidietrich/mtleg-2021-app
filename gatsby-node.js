/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// TK data import + merge

// TODO: See if it makes more sense to query data file via GraphQL here

// const { bills, lawmakers, updateDate } = require('./src/data/main.json')
const bills = require('./src/data/bills.json')
const lawmakers = require('./src/data/lawmakers.json')
const committees = {} // TODO

exports.createPages = async ({ graphql, actions: { createPage } }) => {

    lawmakers.forEach(async lawmaker => {
        const key = lawmaker.key
        const imageSlug = lawmaker.imageSlug

        createPage({
            path: `/lawmakers/${key}`,
            component: require.resolve('./src/templates/lawmaker.js'),
            context: {
                lawmaker,
                imageSlug, // For portrait image
            },
        })
    })

    bills.forEach(bill => {
        const key = bill.key
        const sponsor = lawmakers.find(lawmaker => lawmaker.name === bill.sponsor)
        const { title, name, district, party, locale } = sponsor
        createPage({
            path: `/bills/${key}`,
            component: require.resolve('./src/templates/bill.js'),
            context: {
                bill,
                // Abbreviated info on sponsor for sake of data bundle size
                sponsor: { key, title, name, district, party, locale }
            },
        })
    })
}