
import { AircraftModelEntity } from './typeorm-aircraft-model.entity'
import { AircraftModel } from '../../domain/aircraft-model'

export const AircraftModelMapper = {
  toDomain(entity: AircraftModelEntity): AircraftModel {
    return AircraftModel.reconstruct({
      id: entity.id,
      name: entity.name,
      code: entity.code,
      manufacturer: entity.manufacturer,
      passengerCapacity: entity.passengerCapacity,
      numEngines: entity.numEngines,
      status: entity.status
    })
  },

  toPersistence(domain: AircraftModel): AircraftModelEntity {
    const entity = new AircraftModelEntity()
    entity.id = domain.id
    entity.name = domain.name
    entity.code = domain.code
    entity.manufacturer = domain.manufacturer
    entity.passengerCapacity = domain.passengerCapacity
    entity.numEngines = domain.numEngines
    entity.status = domain.status

    return entity
  }
}
