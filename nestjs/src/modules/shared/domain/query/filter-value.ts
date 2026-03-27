export type FilterValueType = string | number | boolean;

export class FilterValue {
  constructor(readonly value: FilterValueType) {}
}
