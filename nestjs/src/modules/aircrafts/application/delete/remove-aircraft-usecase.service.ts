import { EntityNotFoundError } from 'src/common/errors'
import { RemoveAircraftInput } from './remove-aircraft-input.dto'
import { AircraftRepository } from '../../domain/aircraft.repository'

export class RemoveAircraftUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: RemoveAircraftInput): Promise<void> {
    const aircraft = await this.aircraftRepository.get(input.id)

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.id)
    }

    await this.aircraftRepository.remove(aircraft)
  }
}
