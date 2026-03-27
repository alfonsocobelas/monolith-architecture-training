import { Filter } from 'src/modules/shared/domain/query/filter'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { FilterField } from 'src/modules/shared/domain/query/filter-field'
import { FilterValue } from 'src/modules/shared/domain/query/filter-value'
import { FilterOperator, Operator } from 'src/modules/shared/domain/query/filter-operator'

export class AircraftsActivesOfModelSpecification extends Criteria {
  constructor(modelId: string) {
    super({
      filters: new Filters([
        new Filter(new FilterField('status'), FilterOperator.fromValue(Operator.EQUAL), new FilterValue('ACTIVE')),
        new Filter(new FilterField('modelId'), FilterOperator.fromValue(Operator.EQUAL), new FilterValue(modelId))
      ])
    })
  }
}
