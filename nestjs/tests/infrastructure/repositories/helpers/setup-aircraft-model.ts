import { TypeOrmAircraftModelRepository } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.repository'
import { AircraftModelBuilder } from '../../../modules/aircraft-models/domain/aircraft-model.builder'
import { moduleFixture } from '../../../jest.setup.integration'

export async function setupAircraftModel(): Promise<string> {
  const aircraftModel = AircraftModelBuilder.aModel().build()

  const repository = moduleFixture.get<TypeOrmAircraftModelRepository>(TypeOrmAircraftModelRepository)
  await repository.save(aircraftModel)

  return aircraftModel.id
}
