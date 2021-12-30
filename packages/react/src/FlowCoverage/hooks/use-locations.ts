import { Coverage, UserAddress } from '@finetwork/coverage'
import { formatLocation } from '../../utils/format-address'
import { isAddressCompleted } from '../../utils/is-address-completed'
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { FLOW_COVERAGE_KEY } from '../Provider'

export const useLocations = (
  address: UserAddress | null,
  coverage: Coverage,
  options: UseQueryOptions = {}
) => {
  const queryClient = useQueryClient()
  const queryState = useQuery(
    ['getLocations', address],
    async ({ queryKey }) => {
      if (!address || !isAddressCompleted(address)) return []
      const dataInLocalStorage = localStorage.getItem(FLOW_COVERAGE_KEY)
      let locations =
        dataInLocalStorage &&
        JSON.parse(dataInLocalStorage).locationsState?.data
      if (locations) return locations
      locations = queryClient.getQueryData(['getLocations', queryKey[1]])
      if (locations) return locations
      locations = await coverage.getLocationsByAddress(address)
      return locations.map(formatLocation)
    },
    {
      enabled: !!address && !!address?.userCheck,
      ...options,
    }
  )
  return queryState
}
