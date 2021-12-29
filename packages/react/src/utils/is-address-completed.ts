import { Address } from '@finetwork/coverage';

export const isAddressCompleted = (address: Address | null) =>
  !!address && !!address.number && address.number.length > 0;
