import { DataSource } from 'typeorm'
import { AircraftModelBuilder } from '../../../modules/aircraft-models/domain/aircraft-model.builder'

export async function setupAircraftModel(connection: DataSource): Promise<string> {
  const aircraftModel = AircraftModelBuilder.aModel().build()
  await connection.getRepository('AircraftModelEntity').save(aircraftModel)
  return aircraftModel.id
}
