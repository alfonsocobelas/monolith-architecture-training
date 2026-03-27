import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Aircraft } from './aircraft'
import { AircraftReadModel } from './aircraft-types'

export abstract class AircraftRepository {
  abstract register(aircraft: Aircraft): Promise<void>
  abstract save(aircrafts: Aircraft | Aircraft[]): Promise<void>
  abstract remove(aircraft: Aircraft): Promise<void>
  abstract get(aircraftId: string): Promise<Nullable<Aircraft>>
  abstract getTechnicalSheet(aircraftId: string): Promise<Nullable<AircraftReadModel>>
  abstract find(aircraftIds: string[]): Promise<Aircraft[]>
  abstract matching(criteria: Criteria): Promise<Aircraft[]>
  abstract exists(criteria: Criteria): Promise<boolean>
  abstract count(criteria: Criteria): Promise<number>
}
