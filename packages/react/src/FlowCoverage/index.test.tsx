import React from 'react'
import '@testing-library/jest-dom'
import { FLOW_COVERAGE_KEY, useFlowCoverage } from '.'
import { renderHook, act } from '@testing-library/react-hooks'
import { Wrapper } from '../mocks/wrapper'
import { waitFor } from '@testing-library/react'
import {
  MOCK_ADDRESS,
  MOCK_INPUT_ADDRESS,
  MOCK_INPUT_ADDRESS_LOCAL_STORAGE,
  MOCK_INPUT_ADDRESS_NOT_FOUND,
  MOCK_INPUT_ADDRESS_SERVER_ERROR,
} from '../mocks/address'

describe('FlowCoverage', () => {
  beforeEach(() => {
    localStorage.clear()
  })
  it('should render and be empty', () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    expect(result.current.addressesState.data).toBeUndefined()
    expect(result.current.locationsState.data).toBeUndefined()
    expect(result.current.coverageState.data).toBeUndefined()
    expect(result.current.inputAddress).toBe('')
    expect(result.current.selectedAddress).toBeNull()
    expect(result.current.coverage).toBeDefined()
  })
  it('should retrive data from localStorage', () => {
    localStorage.setItem(
      FLOW_COVERAGE_KEY,
      JSON.stringify(MOCK_INPUT_ADDRESS_LOCAL_STORAGE)
    )
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })
    expect(result.current.inputAddress).toBe(
      MOCK_INPUT_ADDRESS_LOCAL_STORAGE.inputAddress
    )
    expect(result.current.selectedAddress).toBe(
      MOCK_INPUT_ADDRESS_LOCAL_STORAGE.selectedAddress
    )
    expect(result.current.step).toBe(MOCK_INPUT_ADDRESS_LOCAL_STORAGE.step)
  })
  it('should set input address', () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setInputAddress(MOCK_INPUT_ADDRESS)
    })
    expect(result.current.inputAddress).toBe(MOCK_INPUT_ADDRESS)
  })
  it('should activate addresses state flow when input address is setted', async () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setInputAddress(MOCK_INPUT_ADDRESS)
    })
    expect(result.current.addressesState.isLoading).toBeTruthy()
    await waitFor(() => {
      expect(result.current.addressesState.isLoading).toBeFalsy()
      expect(result.current.addressesState.data).toBeDefined()
    })
  })
  it('should be isError truthy if input address is not found', async () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setInputAddress(MOCK_INPUT_ADDRESS_NOT_FOUND)
    })
    expect(result.current.addressesState.isLoading).toBeTruthy()
    await waitFor(() => {
      expect(result.current.addressesState.isLoading).toBeFalsy()
      expect(result.current.addressesState.isError).toBeFalsy()
    })
  })
  it('should be isError truthy if server error occurs getting address', async () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setInputAddress(MOCK_INPUT_ADDRESS_SERVER_ERROR)
    })
    expect(result.current.addressesState.isLoading).toBeTruthy()
    await waitFor(() => {
      expect(result.current.addressesState.isLoading).toBeFalsy()
      expect(result.current.addressesState.isError).toBeTruthy()
    })
  })
  it('should set selected address', () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setAddress(MOCK_ADDRESS)
    })
    expect(result.current.selectedAddress).toEqual(MOCK_ADDRESS)
  })
  it('should not activate locations state flow when address is setted but not completed', async () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setAddress(MOCK_ADDRESS)
    })
    expect(result.current.locationsState.isLoading).toBeFalsy()
  })
  it('should activate locations state flow when address is setted and completed', async () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setAddress({ ...MOCK_ADDRESS, userCheck: true })
    })
    expect(result.current.locationsState.isLoading).toBeTruthy()
    await waitFor(() => {
      expect(result.current.locationsState.isLoading).toBeFalsy()
      expect(result.current.locationsState.data).toBeDefined()
    })
  })
  it('should set state in localStorage on init', () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    renderHook(() => useFlowCoverage(), { wrapper })

    expect(localStorage.getItem(FLOW_COVERAGE_KEY)).toBeDefined()
  })
  it('should set state in localStorage when state changes', () => {
    const wrapper = ({ children }) => <Wrapper>{children}</Wrapper>
    const { result } = renderHook(() => useFlowCoverage(), { wrapper })

    act(() => {
      result.current.setInputAddress(MOCK_INPUT_ADDRESS)
    })
    const { coverage, ...state } = JSON.parse(JSON.stringify(result.current))
    const stateInLocalStorage = JSON.parse(
      localStorage.getItem(FLOW_COVERAGE_KEY)
    )
    expect(stateInLocalStorage).toStrictEqual(state)
  })
})
