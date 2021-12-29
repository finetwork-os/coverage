import { Address, Coverage } from '@finetwork/coverage'
import { useQuery, useQueryClient } from 'react-query'
import { FLOW_COVERAGE_KEY } from '../Provider'

const formatAddress = ({ label, ...address }: Address) => ({
  ...address,
  id: label,
  label,
})

export const useAddresses = (
  value: string,
  coverage: Coverage,
  cb?: () => void
) => {
  const queryClient = useQueryClient()
  const state = useQuery(
    ['getAddresses', value],
    async ({ queryKey }) => {
      if (!queryKey[1] || queryKey[1].length === 0) return undefined
      const dataInLocalStorage = localStorage.getItem(FLOW_COVERAGE_KEY)
      let addresses =
        dataInLocalStorage &&
        JSON.parse(dataInLocalStorage).locationsState?.data
      if (addresses) return addresses
      addresses = queryClient.getQueryData(['getAddresses', queryKey[1]])
      if (addresses) return addresses
      addresses = await coverage.getNormalizedAddressesByInput(
        'address',
        queryKey[1]
      )
      return addresses.map(formatAddress)
    },
    {
      onSuccess: () => cb?.(),
      keepPreviousData: true,
      enabled: !!value,
    }
  )
  return state
}
