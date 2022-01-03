import React, { FC } from 'react'

import { Context } from './Context'
import { Coverage } from '@finetwork/coverage'
import { useSubscribeCoverage } from '../utils/use-subscribe-coverage'

type ProviderProps = {
  coverage: Coverage
}

export const Provider: FC<ProviderProps> = ({ children, coverage }) => {
  const state = useSubscribeCoverage(coverage)
  return (
    <Context.Provider
      value={{
        coverage,
        state,
      }}
    >
      {children}
    </Context.Provider>
  )
}
