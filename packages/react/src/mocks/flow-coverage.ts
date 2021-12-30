import { Address } from '@finetwork/coverage'
import { FlowCoverageState } from '../FlowCoverage'

export const MOCK_STEP = 'location'
export const MOCK_INPUT_ADDRESS = '0x123'
export const MOCK_INPUT_ADDRESS_NOT_FOUND = 'not_found'
export const MOCK_INPUT_ADDRESS_SERVER_ERROR = 'server_error'
export const MOCK_INPUT_ADDRESS_LOCAL_STORAGE: Partial<FlowCoverageState> = {
  inputAddress: '0x123_LOCAL_STORAGE',
  selectedAddress: null,
  step: 'address',
}
export const MOCK_ADDRESS: Address = {
  label: 'MOCK_ADDRESS',
  number: '0x123',
  street: 'MOCK_STREET',
  province: 'MOCK_PROVINCE',
  provinceId: 'MOCK_PROVINCE_ID',
  streetId: 0,
  town: 'MOCK_TOWN',
  cp: 'MOCK_CP',
  townId: 'MOCK_TOWN_ID',
  type: 'MOCK_TYPE',
  homeId: 'MOCK-HOMEID',
}
