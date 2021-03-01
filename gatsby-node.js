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
const committees = require('./src/data/committees.json')

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
        const sponsor = lawmakers.find(lawmaker => lawmaker.name === bill.sponsor.name)
        const { title, name, district, party, locale } = sponsor
        createPage({
            path: `/bills/${key}`,
            component: require.resolve('./src/templates/bill.js'),
            context: {
                bill,
                // Abbreviated info on sponsor for sake of data bundle size
                // TODO: It would probably be more elegant to do this data merge in data processing step
                sponsor: { key, title, name, district, party, locale }
            },
        })
    })

    committees.forEach(committee => {
        const key = committee.key
        createPage({
            path: `/committees/${key}`,
            component: require.resolve('./src/templates/committee.js'),
            context: {
                committee,
            }
        })
    })
}