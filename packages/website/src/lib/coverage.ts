import { Coverage } from '@finetwork/coverage'

export const coverage = new Coverage({
  storage: typeof window !== 'undefined' ? localStorage : null,
  urls: {
    normalizer: 'https://gateway-public-area.finetwork.com/coverage/normalize',
    locator: '',
    visibility: '',
  },
})
