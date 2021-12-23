import React, { FC, useEffect, useState } from 'react'
import { State, initialState } from './State'

import { Context } from './Context'
import { Coverage } from '@finetwork/coverage'

type StateKeys = 'installationAddress' | 'addressHistory'
type ProviderProps = {
  coverage: Coverage
}

export const Provider: FC<ProviderProps> = ({ children, coverage }) => {
  const [state, setState] = useState<State>(initialState)
  const patchState = (key: StateKeys) => (value: any) => {
    setState((prev) => ({
      ...prev,
      [key]: value,
    }))
  }
  useEffect(() => {
    Coverage.events.on(
      'installationAddressChange',
      patchState('installationAddress')
    )
    Coverage.events.on('addressHistoryChange', patchState('addressHistory'))
    patchState('installationAddress')(coverage.installationAddress)
    patchState('addressHistory')(coverage.addressHistory)
    return () => {
      Coverage.events.off(
        'installationAddressChange',
        patchState('installationAddress')
      )
      Coverage.events.off('addressHistoryChange', patchState('addressHistory'))
    }
  }, [])
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
