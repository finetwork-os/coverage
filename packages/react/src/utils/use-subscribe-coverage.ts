import { FC, useEffect, useRef, useState } from 'react'

import { Coverage } from '@finetwork/coverage'
import { State } from '../Coverage/State'
import { initialState } from '../Coverage/State'

type StateKeys = 'installationAddress' | 'addressHistory'

export const useSubscribeCoverage = (coverage: Coverage) => {
  const mounted = useRef(false)
  const [state, setState] = useState<State>(initialState)
  const patchState = (key: StateKeys) => {
    if (!mounted) return
    return (value: any) => {
      if (!mounted) return
      setState((prev) => ({
        ...prev,
        [key]: value,
      }))
    }
  }
  useEffect(() => {
    mounted.current = true
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
      mounted.current = false
    }
  }, [])
  return state
}
