import { Address, Coverage, Location, UserAddress } from '@finetwork/coverage'
import { UseQueryOptions, UseQueryResult } from 'react-query'

export type Step = 'address' | 'location' | 'coverage'
export type FlowCoverageState = {
  coverage: Coverage
  step: Step
  inputAddress: string
  addressesState?: UseQueryResult<Address[], unknown> | null
  locationsState?: UseQueryResult<Location[], unknown> | null
  coverageState?: UseQueryResult<unknown[], unknown> | null
  selectedAddress: UserAddress | null
  setStep: (step: Step) => void
  setAddress: (address: UserAddress) => void
  setInputAddress: (input: string) => void
  optionsAddressesState: UseQueryOptions
  optionsLocationsState: UseQueryOptions
  optionsCoverageState: UseQueryOptions
  setOptionsAddressesState: (options: UseQueryOptions) => void
  setOptionsLocationsState: (options: UseQueryOptions) => void
  setOptionsCoverageState: (options: UseQueryOptions) => void
  clearAddress: () => void
}
