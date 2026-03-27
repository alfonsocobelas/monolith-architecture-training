import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Fleet } from './fleet'

export abstract class FleetRepository {
  abstract register(fleet: Fleet): Promise<void>
  abstract get(fleetId: string): Promise<Nullable<Fleet>>
  abstract save(fleets: Fleet | Fleet[]): Promise<void>
  abstract matching(criteria: Criteria): Promise<Fleet[]>
  abstract exists(criteria: Criteria): Promise<boolean>
  abstract count(criteria: Criteria): Promise<number>
}
