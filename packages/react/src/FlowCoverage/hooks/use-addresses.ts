import { Address, Coverage } from '@finetwork/coverage'
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { FLOW_COVERAGE_KEY } from '../Provider'

const formatAddress = ({ label, ...address }: Address) => ({
  ...address,
  id: label,
  label,
})

export const useAddresses = (
  value: string,
  coverage: Coverage,
  options: UseQueryOptions = {}
) => {
  const queryClient = useQueryClient()
  const state = useQuery(
    ['getAddresses', value],
    async ({ queryKey }) => {
      if (!queryKey[1] || (queryKey[1] as string).length === 0) return undefined
      const dataInLocalStorage = localStorage.getItem(FLOW_COVERAGE_KEY)
      let addresses =
        dataInLocalStorage &&
        JSON.parse(dataInLocalStorage).locationsState?.data
      if (addresses) return addresses
      addresses = queryClient.getQueryData(['getAddresses', queryKey[1]])
      if (addresses) return addresses
      addresses = await coverage.getNormalizedAddressesByInput(
        'address',
        queryKey[1] as string
      )
      return addresses.map(formatAddress)
    },
    {
      keepPreviousData: !!value,
      enabled: !!value,
      ...options,
    }
  )
  return state
}
