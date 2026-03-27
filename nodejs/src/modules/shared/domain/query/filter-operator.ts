import { InvalidArgumentError } from 'src/common/errors'

export enum Operator {
  EQUAL = 'eq',
  NOT_EQUAL = 'neq',
  GT = 'gt',
  GTE = 'gte',
  LT = 'lt',
  LTE = 'lte',
  IN = 'in',
  CONTAINS = 'contains',
  NOT_CONTAINS = 'not_contains'
}

const OPERATOR_MAP = new Map<string, Operator>(Object.values(Operator).map(val => [val, val]))

export class FilterOperator {
  constructor(readonly value: Operator) {}

  static fromValue(value: string): FilterOperator {
    const op = OPERATOR_MAP.get(value)

    if (!op) {
      throw new InvalidArgumentError(`The filter operator ${value} is invalid`)
    }

    return new FilterOperator(op)
  }

  isEqual(): boolean {
    return this.value === Operator.EQUAL
  }

  isNotEqual(): boolean {
    return this.value === Operator.NOT_EQUAL
  }

  isGreaterThan(): boolean {
    return this.value === Operator.GT
  }

  isGreaterThanOrEqual(): boolean {
    return this.value === Operator.GTE
  }

  isLessThan(): boolean {
    return this.value === Operator.LT
  }

  isLessThanOrEqual(): boolean {
    return this.value === Operator.LTE
  }

  isIn(): boolean {
    return this.value === Operator.IN
  }

  isContains(): boolean {
    return this.value === Operator.CONTAINS
  }

  isNotContains(): boolean {
    return this.value === Operator.NOT_CONTAINS
  }
}
