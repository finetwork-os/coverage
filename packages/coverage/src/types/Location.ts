import { ApiHorizontal } from '.';
import { Horizontal } from './Horizontal';

export type ApiLocation = {
  Horizontals: {
    Horizontal: ApiHorizontal[];
  };
  IsSuggested: string;
  PostCode: string;
  ProvinceName: string;
  StreetId: string;
  StreetName: string;
  ThoroughfareType: string;
  TownName: string;
  streettype: string;
};

export type Location = {
  isSuggested: string;
  postCode: string;
  provinceName: string;
  streetId: string;
  streetName: string;
  thoroughfareType: string;
  townName: string;
  streetType: string;
  horizontals: Horizontal[];
};
