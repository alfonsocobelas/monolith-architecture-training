import { Fleet } from '../../domain/fleet'
import { FleetEntity } from './typeorm-fleet.entity'

export const FleetMapper = {
  toDomain(entity: FleetEntity): Fleet {
    return Fleet.reconstruct({
      id: entity.id,
      aircraftIds: entity.aircraftIds,
      companyId: entity.companyId,
      name: entity.name,
      operationRegion: entity.operationRegion,
      type: entity.type,
      maintenanceBudget: entity.maintenanceBudget,
      status: entity.status
    })
  },

  toPersistence(domain: Fleet): FleetEntity {
    const entity = new FleetEntity()
    entity.id = domain.id
    entity.aircraftIds = domain.aircraftIds
    entity.companyId = domain.companyId
    entity.name = domain.name
    entity.operationRegion = domain.operationRegion
    entity.type = domain.type
    entity.maintenanceBudget = domain.maintenanceBudget
    entity.status = domain.status

    return entity
  }
}
