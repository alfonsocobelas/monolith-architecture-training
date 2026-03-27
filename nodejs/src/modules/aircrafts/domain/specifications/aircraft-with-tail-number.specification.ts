import { Filter } from 'src/modules/shared/domain/query/filter'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { FilterField } from 'src/modules/shared/domain/query/filter-field'
import { FilterValue } from 'src/modules/shared/domain/query/filter-value'
import { FilterOperator, Operator } from 'src/modules/shared/domain/query/filter-operator'

export class AircraftWithTailNumberSpecification extends Criteria {
  constructor(tailNumber: string) {
    super({
      filters: new Filters([
        new Filter(new FilterField('tailNumber'), FilterOperator.fromValue(Operator.EQUAL), new FilterValue(tailNumber))
      ])
    })
  }
}
