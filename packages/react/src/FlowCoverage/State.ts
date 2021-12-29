import { Address, Coverage, UserAddress } from '@finetwork/coverage'
import { UseQueryResult } from 'react-query'

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
}
