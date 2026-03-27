import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Filter } from 'src/modules/shared/domain/query/filter'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { FilterField } from 'src/modules/shared/domain/query/filter-field'
import { FilterValue } from 'src/modules/shared/domain/query/filter-value'
import { FilterOperator, Operator } from 'src/modules/shared/domain/query/filter-operator'

export class IssueWithCodeSpecification extends Criteria {
  constructor(public readonly code: string) {
    super({
      filters: new Filters([
        new Filter(new FilterField('code'), FilterOperator.fromValue(Operator.EQUAL), new FilterValue(code))
      ])
    })
  }
}
