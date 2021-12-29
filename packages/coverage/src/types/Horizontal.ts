import { ApiVertical } from '.';
import { Vertical } from './Vertical';

export type ApiHorizontal = {
  Duplicate: any;
  HorizontalId: string;
  StreetNumber: string;
  Verticals: {
    Vertical: ApiVertical[] | ApiVertical;
  };
  block: any;
  blockName: any;
  blockNumber: any;
  blockRaw: any;
  fieldDoor: any;
  fieldFloor: any;
  fieldNumber: string;
  fieldStair: any;
  hand1: any;
  hand1Raw: any;
  hand2: any;
  identifier: any;
  identifierName: any;
  identifierNumber: any;
  letter: any;
  stairNumber: any;
  stairRaw: any;
};

export type Horizontal = {
  duplicate: any;
  horizontalId: string;
  streetNumber: string;
  verticals: Vertical[];
  block: any;
  blockName: any;
  blockNumber: any;
  blockRaw: any;
  fieldDoor: any;
  fieldFloor: any;
  fieldNumber: string;
  fieldStair: any;
  hand1: any;
  hand1Raw: any;
  hand2: any;
  identifier: any;
  identifierName: any;
  identifierNumber: any;
  letter: any;
  stairNumber: any;
  stairRaw: any;
  label?: string;
};
