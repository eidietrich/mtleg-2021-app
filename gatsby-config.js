/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    // TODO: Fine-tune this
    title: `Montana 2021 | Montana Free Press`,
    description: `The MTFP guide to the 2021 Montana Legislature`,
    author: `Eric Dietrich / Montana Free Press`,
    siteUrl:`https://www.apps.montanafreepress.org/tk-2021-montana-legislature`,
    keywords: ['Montana','Legislature','House','Senate','2021', 'state budget']
  },
  pathPrefix: `/montana-2020`, // for S3
  plugins: [
    `gatsby-plugin-react-helmet`,
    
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    
    `gatsby-plugin-emotion`, // styled components
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          "G-QCYEM18RKM", // TK, Google Analytics
          "", // TK, Google adwords
        ]
      }
    },
    {
      resolve: `gatsby-plugin-parsely-analytics`,
      options: {
        apikey: 'montanafreepress.org',
        enableInDevelopment: false // send page views when NODE_ENV !== prod
      }
    },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-webpack-size`,
  ],
}
