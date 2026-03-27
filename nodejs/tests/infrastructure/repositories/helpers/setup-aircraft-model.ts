import { EntityManager } from 'typeorm'
import { AircraftModelBuilder } from '../../../modules/aircraft-models/domain/aircraft-model.builder'

export async function setupAircraftModel(manager: EntityManager): Promise<string> {
  const aircraftModel = AircraftModelBuilder.aModel().build()
  await manager.getRepository('AircraftModelEntity').save(aircraftModel)
  return aircraftModel.id
}
