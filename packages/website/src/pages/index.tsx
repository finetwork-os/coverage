import React, { useEffect, useState } from 'react'

import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import clsx from 'clsx'
import styles from './index.module.css'
import {
  FlowCoverageProvider,
  CoverageProvider,
  useFlowCoverage,
} from '@finetwork/coverage-react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { coverage } from '../lib/coverage'
import { queryClient } from '../lib/react-query'
import { QueryClientProvider } from 'react-query'
import { Address } from '@finetwork/coverage'

// function debounce(func, wait, immediate?) {
//   var timeout
//   return function () {
//     var context = this,
//       args = arguments
//     var later = function () {
//       timeout = null
//       if (!immediate) func.apply(context, args)
//     }
//     var callNow = immediate && !timeout
//     clearTimeout(timeout)
//     timeout = setTimeout(later, wait)
//     if (callNow) func.apply(context, args)
//   }
// }

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  // const { inputAddress, setInputAddress, addressesState } = useFlowCoverage()
  // const onChange = (e) => {
  //   setInputAddress(e.target.value)
  // }
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/getting-started/install"
          >
            Getting started
          </Link>
        </div>
      </div>
      {/* <div>
        <p>
          <input type="text" onChange={debounce(onChange, 500)} />
        </p>
        <p>{inputAddress}</p>
        <p>
          <button type="button">busca</button>
        </p>
        <p>
          {addressesState?.isFetching
            ? 'Cargando direcciones...'
            : JSON.stringify(addressesState?.data)}
        </p>
      </div> */}
    </header>
  )
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext()
  // const {
  //   state: { installationAddress },
  // } = useCoverage()
  useEffect(() => {}, [])
  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <FlowCoverageProvider coverage={coverage}>
        <Layout title={siteConfig.title} description="Coverage SDK">
          <HomepageHeader />
          <main>{/* <HomepageFeatures />   */}</main>
        </Layout>
      </FlowCoverageProvider>
    </QueryClientProvider>
  )
}
