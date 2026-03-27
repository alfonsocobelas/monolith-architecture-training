import { Filter } from 'src/modules/shared/domain/query/filter'
import { Filters } from 'src/modules/shared/domain/query/filters'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { FilterField } from 'src/modules/shared/domain/query/filter-field'
import { FilterValue } from 'src/modules/shared/domain/query/filter-value'
import { FilterOperator, Operator } from 'src/modules/shared/domain/query/filter-operator'
import { AircraftStatus } from '../aircraft-enums'

export class AircraftsInMaintenanceSpecification extends Criteria {
  constructor() {
    super({
      filters: new Filters([
        new Filter(
          new FilterField('status'),
          FilterOperator.fromValue(Operator.EQUAL),
          new FilterValue(AircraftStatus.MAINTENANCE)
        )
      ])
    })
  }
}
