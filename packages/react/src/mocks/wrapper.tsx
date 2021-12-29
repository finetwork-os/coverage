import React from 'react'
import { Coverage } from '@finetwork/coverage'
import { QueryClient, QueryClientProvider } from 'react-query'
import { FlowCoverageProvider } from '../FlowCoverage'

const mockCoverage = new Coverage({
  storage: typeof window !== 'undefined' ? localStorage : null,
  urls: {
    normalizer: '/normalize',
    locator: '/locator',
    visibility: '/visibility',
  },
})
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

export const Wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <FlowCoverageProvider coverage={mockCoverage}>
      {children}
    </FlowCoverageProvider>
  </QueryClientProvider>
)
