import { Coverage } from '@finetwork/coverage'
import { FlowCoverageState } from './State'

export const initialState: FlowCoverageState = {
  coverage: new Coverage({
    urls: {
      locator: '',
      normalizer: '',
      visibility: '',
    },
  }),
  step: 'address',
  selectedAddress: null,
  inputAddress: '',
  setStep: () => {},
  setAddress: () => {},
  setInputAddress: () => {},
  optionsAddressesState: {},
  optionsLocationsState: {},
  optionsCoverageState: {},
  setOptionsAddressesState: () => {},
  setOptionsLocationsState: () => {},
  setOptionsCoverageState: () => {},
  clearAddress: () => {},
}
