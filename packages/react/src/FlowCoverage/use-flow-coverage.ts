import { useContext } from 'react'
import { FlowCoverageContext } from './Context'

export const useFlowCoverage = () => {
  const context = useContext(FlowCoverageContext)
  if (context === undefined) {
    throw new Error(
      'useFlowCoverage must be used within a FlowCoverageProvider'
    )
  }
  return context
}
