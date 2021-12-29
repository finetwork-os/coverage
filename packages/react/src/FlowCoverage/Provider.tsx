import { Coverage, UserAddress } from '@finetwork/coverage'
import { isServer } from '@finetwork/coverage/src/utils'
import React, { FC, useCallback, useEffect, useReducer } from 'react'
import { FlowCoverageState, Step } from '.'
import { FlowCoverageContext } from './Context'
import { flowCoverageReducer } from './reducer'
import { useAddresses, useLocations, useOffersCoverage } from './hooks'
import { initialState } from './initial-state'

export const FLOW_COVERAGE_KEY = 'fi_flow_coverage'

type ProviderProps = {
  coverage: Coverage
}
export const FlowCoverageProvider: FC<ProviderProps> = ({
  children,
  coverage,
}) => {
  const [state, dispatch] = useReducer(
    flowCoverageReducer,
    initialState,
    (initial) => {
      if (isServer()) return initial
      const initialStorage = localStorage.getItem(FLOW_COVERAGE_KEY)
      if (initialStorage) return JSON.parse(initialStorage)
      return initial
    }
  )

  const addressesState = useAddresses(
    state.inputAddress,
    coverage
  ) as FlowCoverageState['addressesState']
  const locationsState = useLocations(state.selectedAddress, coverage, () => {
    if (coverage.installationAddress) return
    setStep('location')
  }) as FlowCoverageState['locationsState']
  const coverageState = useOffersCoverage(coverage, () => {
    setStep('coverage')
  }) as FlowCoverageState['coverageState']

  const setStep = useCallback(
    (step: Step): void => {
      if (step === 'address') {
        locationsState?.remove()
        coverage.removeInstallationAddress()
      }
      if (step === 'location') {
        coverageState?.remove()
        coverage.removeInstallationAddress()
      }
      dispatch({
        payload: step,
        type: 'SET_STEP',
      })
    },
    [locationsState, coverage, coverageState]
  )

  const setAddress = (address: UserAddress): void =>
    dispatch({
      payload: address,
      type: 'SET_ADDRESS',
    })
  const setInputAddress = (input: string): void =>
    dispatch({
      payload: input,
      type: 'SET_INPUT_ADDRESS',
    })

  useEffect(() => {
    localStorage.setItem(
      FLOW_COVERAGE_KEY,
      JSON.stringify({
        ...state,
        addressesState,
        locationsState,
        coverageState,
      })
    )
  }, [state, addressesState, coverageState, locationsState])

  return (
    <FlowCoverageContext.Provider
      value={{
        ...state,
        setStep,
        setAddress,
        setInputAddress,
        addressesState,
        locationsState,
        coverageState,
        coverage,
      }}
    >
      {children}
    </FlowCoverageContext.Provider>
  )
}
