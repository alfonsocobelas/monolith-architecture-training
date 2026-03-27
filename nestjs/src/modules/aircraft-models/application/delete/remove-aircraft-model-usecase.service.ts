import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/common/errors'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { AircraftsOfModelSpecification } from 'src/modules/aircrafts/domain/specifications/aircrafts-of-model.specification'
import { RemoveAircraftModelInput } from './remove-aircraft-model-input.dto'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'

@Injectable()
export class RemoveAircraftModelUseCase {
  constructor(
    private readonly modelRepository: AircraftModelRepository,
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: RemoveAircraftModelInput): Promise<void> {
    const [model, aircraftCount] = await Promise.all([
      this.modelRepository.get(input.id),
      this.aircraftRepository.count(new AircraftsOfModelSpecification(input.id))
    ])

    if (!model) {
      throw new EntityNotFoundError('AircraftModel', input.id)
    }

    model.ensureCanBeRemoved(aircraftCount)

    await this.modelRepository.remove(input.id)
  }
}
