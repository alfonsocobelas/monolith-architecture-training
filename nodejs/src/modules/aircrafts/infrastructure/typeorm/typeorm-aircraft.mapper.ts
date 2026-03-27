import { AircraftEntity } from './typeorm-aircraft.entity'
import { Aircraft } from '../../domain/aircraft'
import { AircraftReadModel } from '../../domain/aircraft-types'

export const AircraftMapper = {
  toDomain(entity: AircraftEntity): Aircraft {
    return Aircraft.reconstruct({
      id: entity.id,
      fleetId: entity.fleetId ?? undefined,
      modelId: entity.modelId,
      engineIds: entity.engineIds,
      tailNumber: entity.tailNumber,
      totalFlightHours: entity.totalFlightHours,
      fuelLevelPercentage: entity.fuelLevelPercentage,
      status: entity.status,
      isActive: entity.isActive
    })
  },

  toReadModel(entity: AircraftEntity): AircraftReadModel {
    return {
      id: entity.id,
      fleetId: entity.fleetId ?? undefined,
      modelId: entity.modelId,
      engineIds: entity.engineIds,
      tailNumber: entity.tailNumber,
      totalFlightHours: entity.totalFlightHours,
      fuelLevelPercentage: entity.fuelLevelPercentage,
      isActive: entity.isActive,
      status: entity.status,
      model: {
        id: entity.model.id,
        name: entity.model.name,
        numEngines: entity.model.numEngines
      },
      engines: entity.engines.map(engine => ({
        id: engine.id,
        healthScore: engine.healthScore
      }))
    }
  },

  toPersistence(domain: Aircraft): AircraftEntity {
    const entity = new AircraftEntity()
    entity.id = domain.id
    entity.fleetId = domain.fleetId ?? null
    entity.modelId = domain.modelId
    entity.engineIds = domain.engineIds
    entity.tailNumber = domain.tailNumber
    entity.totalFlightHours = domain.totalFlightHours
    entity.fuelLevelPercentage = domain.fuelLevelPercentage
    entity.status = domain.status
    entity.isActive = domain.isActive

    return entity
  }
}
