import React from "react"
import Layout from '../components/Layout'
import SEO from '../components/Seo'
import { Link } from 'gatsby'

const ErrorPage = () => {
  return <div>
    <SEO title="404" description="Page not found"/>
    <Layout>

      <h1>URL not found</h1>
      <div>Return to guide <Link to='/'>overview</Link>.</div>
      
    </Layout>
  </div>
}

export default ErrorPage