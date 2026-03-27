import { AlreadyExistsError, EntityNotFoundError } from 'src/common/errors'
import { AircraftModelRepository } from 'src/modules/aircraft-models/domain/aircraft-model.repository'
import { RegisterAircraftInput } from './register-aircraft-input.dto'
import { Aircraft } from '../../domain/aircraft'
import { AircraftRepository } from '../../domain/aircraft.repository'
import { AircraftWithTailNumberSpecification } from '../../domain/specifications/aircraft-with-tail-number.specification'

export class RegisterAircraftUseCase {
  constructor(
    private readonly aircraftRepository: AircraftRepository,
    private readonly modelRepository: AircraftModelRepository
  ) {}

  async invoke(input: RegisterAircraftInput): Promise<void> {
    const [model, aircraftExists] = await Promise.all([
      this.modelRepository.get(input.modelId),
      this.aircraftRepository.exists(new AircraftWithTailNumberSpecification(input.tailNumber))
    ])

    if (!model) {
      throw new EntityNotFoundError('AircraftModel', input.modelId)
    }

    if (aircraftExists) {
      throw new AlreadyExistsError('Aircraft', 'tailNumber', input.tailNumber)
    }

    const aircraft = Aircraft.create({
      id: input.id,
      modelId: input.modelId,
      tailNumber: input.tailNumber
    })

    await this.aircraftRepository.register(aircraft)
  }
}
