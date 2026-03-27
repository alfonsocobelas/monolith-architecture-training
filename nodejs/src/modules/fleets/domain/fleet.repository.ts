import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Fleet } from './fleet'

export interface FleetRepository {
  register(fleet: Fleet): Promise<void>
  get(fleetId: string): Promise<Nullable<Fleet>>
  save(fleets: Fleet | Fleet[]): Promise<void>
  matching(criteria: Criteria): Promise<Fleet[]>
  exists(criteria: Criteria): Promise<boolean>
  count(criteria: Criteria): Promise<number>
}
