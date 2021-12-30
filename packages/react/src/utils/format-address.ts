import {
  ApiHorizontal,
  ApiLocation,
  ApiVertical,
  Horizontal,
  Location,
  Vertical,
} from '@finetwork/coverage'

export const formatVertical = ({
  Door,
  Floor,
  Stairwell,
  VerticalId,
  ...rest
}: ApiVertical): Vertical => ({
  door: Door,
  floor: Floor,
  stairwell: Stairwell,
  verticalId: VerticalId,
  ...rest,
})

export const formatHorizontal = ({
  Duplicate,
  HorizontalId,
  StreetNumber,
  Verticals: { Vertical },
  ...rest
}: ApiHorizontal): Horizontal => {
  const verticals = Vertical
    ? Array.isArray(Vertical)
      ? Vertical.map(formatVertical)
      : [formatVertical(Vertical)]
    : []
  return {
    duplicate: Duplicate,
    horizontalId: HorizontalId,
    streetNumber: StreetNumber,
    verticals,
    ...rest,
  }
}

export const formatLocation = (location: ApiLocation): Location => {
  const { Horizontal } = location?.Horizontals
  const horizontals = Horizontal
    ? Array.isArray(Horizontal)
      ? Horizontal.map(formatHorizontal)
      : [formatHorizontal(Horizontal)]
    : []
  return {
    isSuggested: location.IsSuggested,
    postCode: location.PostCode,
    provinceName: location.ProvinceName,
    streetId: location.StreetId,
    streetName: location.StreetName,
    thoroughfareType: location.ThoroughfareType,
    townName: location.TownName,
    streetType: location.streettype,
    horizontals,
  }
}
