import { HomeId } from './HomeId'

export interface Address {
  cp: string
  label: string
  province: string
  provinceId: string
  number: string
  street: string
  streetId: number
  town: string
  townId: string
  type: string
  homeId?: `${string}-${string}`
}

export type UserAddress = Address & {
  userCheck?: boolean
  homeId?: HomeId
}
