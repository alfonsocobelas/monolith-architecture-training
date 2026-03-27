import { EngineEntity } from './typeorm-engine.entity'
import { Engine } from '../../domain/engine'

export const EngineMapper = {
  toDomain(entity: EngineEntity): Engine {
    return Engine.reconstruct({
      id: entity.id,
      healthScore: entity.healthScore,
      serialNumber: entity.serialNumber,
      flyingHoursAccumulated: entity.flyingHoursAccumulated,
      cyclesSinceLastOverhaul: entity.cyclesSinceLastOverhaul,
      status: entity.status,
      isInstalled: entity.isInstalled,
      aircraftId: entity.aircraftId ?? undefined
    })
  },

  toPersistence(domain: Engine): EngineEntity {
    const entity = new EngineEntity()
    entity.id = domain.id
    entity.healthScore = domain.healthScore
    entity.serialNumber = domain.serialNumber
    entity.flyingHoursAccumulated = domain.flyingHoursAccumulated
    entity.cyclesSinceLastOverhaul = domain.cyclesSinceLastOverhaul
    entity.status = domain.status
    entity.isInstalled = domain.isInstalled
    entity.aircraftId = domain.aircraftId ?? null

    return entity
  }
}
