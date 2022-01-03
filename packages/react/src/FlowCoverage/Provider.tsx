import { Coverage, UserAddress, isServer } from '@finetwork/coverage'
import React, { FC, useCallback, useEffect, useReducer, useState } from 'react'
import { FlowCoverageState, Step } from '.'
import { FlowCoverageContext } from './Context'
import { flowCoverageReducer } from './reducer'
import { useAddresses, useLocations, useOffersCoverage } from './hooks'
import { initialState } from './initial-state'
import { UseQueryOptions } from 'react-query'
import { CoverageProvider } from '../Coverage'
import { useSubscribeCoverage } from '../utils/use-subscribe-coverage'

export const FLOW_COVERAGE_KEY = 'fi_flow_coverage'

type ProviderProps = {
  coverage: Coverage
}
export const FlowCoverageProvider: FC<ProviderProps> = ({
  children,
  coverage,
}) => {
  const { installationAddress } = useSubscribeCoverage(coverage)
  const [optionsAddressesState, setOptionsAddressesState] =
    useState<UseQueryOptions>()
  const [optionsLocationsState, setOptionsLocationsState] =
    useState<UseQueryOptions>()
  const [optionsCoverageState, setOptionsCoverageState] =
    useState<UseQueryOptions>()
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
    coverage,
    optionsAddressesState
  ) as FlowCoverageState['addressesState']
  const locationsState = useLocations(
    state.selectedAddress,
    coverage,
    optionsLocationsState
  ) as FlowCoverageState['locationsState']
  const coverageState = useOffersCoverage(
    coverage,
    installationAddress,
    optionsCoverageState
  ) as FlowCoverageState['coverageState']

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

  const setAddress = (address: UserAddress): void => {
    dispatch({
      payload: address,
      type: 'SET_ADDRESS',
    })
  }

  const setInputAddress = (input: string): void => {
    dispatch({
      payload: input,
      type: 'SET_INPUT_ADDRESS',
    })
  }

  const clearAddress = useCallback(() => {
    setInputAddress('')
    setAddress(null)
    addressesState.remove()
  }, [])

  useEffect(() => {
    const {
      coverage,
      optionsAddressesState,
      optionsCoverageState,
      optionsLocationsState,
      ...rest
    } = state
    localStorage.setItem(
      FLOW_COVERAGE_KEY,
      JSON.stringify({
        ...rest,
        addressesState,
        locationsState,
        coverageState,
      })
    )
  }, [state, addressesState, coverageState, locationsState])

  return (
    <CoverageProvider coverage={coverage}>
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
          setOptionsAddressesState,
          setOptionsLocationsState,
          setOptionsCoverageState,
          optionsAddressesState,
          optionsLocationsState,
          optionsCoverageState,
          clearAddress,
        }}
      >
        {children}
      </FlowCoverageContext.Provider>
    </CoverageProvider>
  )
}
