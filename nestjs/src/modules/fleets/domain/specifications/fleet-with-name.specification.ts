import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Filter } from 'src/modules/shared/domain/query/filter'
import { FilterField } from 'src/modules/shared/domain/query/filter-field'
import { FilterOperator, Operator } from 'src/modules/shared/domain/query/filter-operator'
import { FilterValue } from 'src/modules/shared/domain/query/filter-value'
import { Filters } from 'src/modules/shared/domain/query/filters'

export class FleetWithNameSpecification extends Criteria {
  constructor(name: string) {
    super({
      filters: new Filters([
        new Filter(
          new FilterField('name'),
          FilterOperator.fromValue(Operator.EQUAL),
          new FilterValue(name)
        )
      ])
    })
  }
}
