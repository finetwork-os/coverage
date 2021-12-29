import { createContext } from 'react'
import { initialState } from './initial-state'
import { FlowCoverageState } from './State'

export const FlowCoverageContext =
  createContext<FlowCoverageState>(initialState)
