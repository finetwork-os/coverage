import { useMemo } from 'react'
import { useQuery, useQueryClient, UseQueryOptions } from 'react-query'
import { Coverage } from '@finetwork/coverage'
import { FLOW_COVERAGE_KEY } from '../Provider'

export const useOffersCoverage = (
  coverage: Coverage,
  options: UseQueryOptions = {}
) => {
  const queryClient = useQueryClient()
  const address = useMemo(() => {
    if (!coverage.installationAddress) return null
    return {
      streetSegmentId: coverage.installationAddress?.streetId,
      addressId: coverage.installationAddress?.homeId,
      cp: coverage.installationAddress?.cp,
      shopId: 99,
    } as any
  }, [coverage.installationAddress])
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
      enabled: !!coverage.installationAddress,
      ...options,
    }
  )
  return state
}
