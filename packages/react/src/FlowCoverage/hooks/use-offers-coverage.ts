import { useMemo } from 'react'
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { Coverage } from '@finetwork/coverage'
import { FLOW_COVERAGE_KEY } from '../Provider'

export const useOffersCoverage = (
  coverage: Coverage,
  installationAddress: Coverage['installationAddress'],
  options: UseQueryOptions = {}
) => {
  const queryClient = useQueryClient()
  const address = useMemo(() => {
    if (!installationAddress) return null
    return {
      streetSegmentId: installationAddress?.streetId,
      addressId: installationAddress?.homeId,
      cp: installationAddress?.cp,
      shopId: 99,
    } as any
  }, [installationAddress])
  const state = useQuery(
    ['getOffers', address],
    async ({ queryKey }) => {
      if (!queryKey[1]) return undefined
      const dataInLocalStorage = localStorage.getItem(FLOW_COVERAGE_KEY)
      let offers =
        dataInLocalStorage && JSON.parse(dataInLocalStorage).coverageState?.data
      if (offers) return offers
      offers = queryClient.getQueryData(['getOffers', queryKey[1]])
      if (offers) return offers
      offers = await coverage.getOffersByParams(
        queryKey[1] as Record<string, string>
      )
      return offers
    },
    {
      enabled: !!installationAddress,
      ...options,
    }
  )
  return state
}
