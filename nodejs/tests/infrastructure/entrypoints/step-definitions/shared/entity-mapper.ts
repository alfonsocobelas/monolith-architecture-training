/* eslint-disable @typescript-eslint/no-explicit-any */
import { AircraftModelEntity } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.entity'
import { AircraftEntity } from 'src/modules/aircrafts/infrastructure/typeorm/typeorm-aircraft.entity'
import { CompanyEntity } from 'src/modules/companies/infrastructure/typeorm/typeorm-company.entity'
import { EngineEntity } from 'src/modules/engines/infrastructure/typeorm/typeorm-engine.entity'
import { FleetEntity } from 'src/modules/fleets/infrastructure/typeorm/typeorm-fleet.entity'
import { IssueEntity } from 'src/modules/issues/infrastructure/typeorm/typeorm-issue.entity'

type EntityConstructor = { new (): any }

export const EntityMapper: Record<string, EntityConstructor> = {
  aircraft_models: AircraftModelEntity,
  aircrafts: AircraftEntity,
  companies: CompanyEntity,
  engines: EngineEntity,
  fleets: FleetEntity,
  issues: IssueEntity
}
