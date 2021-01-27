/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: `2021 Capitol Tracker | Montana Free Press`,
    description: `A digital guide to the lawmakers, bills and votes shaping Montana's future through the 2021 Montana Legislature`,
    author: `Eric Dietrich / Montana Free Press`,
    siteUrl: `https://www.apps.montanafreepress.org/capitol-tracker-2021/`,
    keywords: ['Montana', 'Legislature', 'House', 'Senate', '2021', 'state budget', 'bills', 'resolutions', 'elections', 'politics'],
    // hacky as hell
    image: "https://apps.montanafreepress.org/capitol-tracker-2021/images/mt-capitol-tracker.png"
  },
  // pathPrefix: `/staging-mtleg-2021`, // staging
  pathPrefix: `/capitol-tracker-2021`, // for S3
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-anchor-links`,
      options: {
        offset: -140,
      }
    },
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
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
    // {
    //   resolve: `gatsby-plugin-parsely-analytics`,
    //   options: {
    //     apikey: 'montanafreepress.org',
    //     enableInDevelopment: false // send page views when NODE_ENV !== prod
    //   }
    // },
    `gatsby-plugin-robots-txt`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-webpack-size`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `2021 Montana Legislature`,
        short_name: `MTLEG`,
        description: `Explore the data behind the 2021 Montana Legislature`,
        start_url: `/`,
        icon: `static/mtfp-icon.png`,
        background_color: `#eae3da`,
        theme_color: `#F85028`,
        display: `standalone`,
      },
    },
  ],
}
