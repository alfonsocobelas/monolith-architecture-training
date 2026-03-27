import { InvalidArgumentError } from 'src/common/errors'
import { FilterOperator } from './filter-operator'
import { FilterField } from './filter-field'
import { FilterValue } from './filter-value'

export class Filter {
  readonly field: FilterField
  readonly operator: FilterOperator
  readonly value: FilterValue

  constructor(field: FilterField, operator: FilterOperator, value: FilterValue) {
    this.field = field
    this.operator = operator
    this.value = value
  }

  static fromValues(value: Map<string, string>): Filter {
    const field = value.get('field')
    const operator = value.get('operator')
    const filterValue = value.get('value')

    if (!field || !operator || !filterValue) {
      throw new InvalidArgumentError('Invalid filter values')
    }

    // todo: añadir validacion de campos permitidos en la cals de filterField?
    // para no tener que hacer el criteriavalidator que hace un foreach
    // el unico problema es que no que los campos permitidos no podrian ser dinamico
    return new Filter(
      new FilterField(field),
      FilterOperator.fromValue(operator),
      new FilterValue(filterValue)
    )
  }
}
