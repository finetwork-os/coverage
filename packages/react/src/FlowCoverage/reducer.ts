import type { FlowCoverageState, Step } from './State'
import type { ActionMap } from '../utils/ActionMap'
import type { UserAddress } from '@finetwork/coverage'

export type Payload = {
  SET_STEP: Step
  SET_ADDRESS: UserAddress
  SET_LOCATIONS: Location[]
  SET_INPUT_ADDRESS: string
  SET_ADDRESSES: UserAddress[]
}
export type Actions = ActionMap<Payload>[keyof ActionMap<Payload>]

export const flowCoverageReducer = (
  state: FlowCoverageState,
  action: Actions
): FlowCoverageState => {
  switch (action.type) {
    case 'SET_STEP':
      return {
        ...state,
        step: action.payload,
        selectedAddress:
          action.payload === 'address'
            ? ({
                ...state.selectedAddress,
                userCheck: false,
              } as UserAddress)
            : state.selectedAddress,
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        selectedAddress: action.payload,
      }
    case 'SET_INPUT_ADDRESS':
      return {
        ...state,
        inputAddress: action.payload,
      }
    default:
      return state
  }
}
