import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Aircraft } from './aircraft'
import { AircraftReadModel } from './aircraft-types'

export interface AircraftRepository {
  register(aircraft: Aircraft): Promise<void>
  save(aircrafts: Aircraft | Aircraft[]): Promise<void>
  remove(aircraft: Aircraft): Promise<void>
  get(aircraftId: string): Promise<Nullable<Aircraft>>
  getTechnicalSheet(aircraftId: string): Promise<Nullable<AircraftReadModel>>
  find(aircraftIds: string[]): Promise<Aircraft[]>
  matching(criteria: Criteria): Promise<Aircraft[]>
  exists(criteria: Criteria): Promise<boolean>
  count(criteria: Criteria): Promise<number>
}
