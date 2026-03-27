import { Injectable } from '@nestjs/common'
import { AlreadyExistsError } from 'src/common/errors'
import { RegisterAircraftModelInput } from './register-aircraft-model-input.dto'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'
import { AircraftModel } from '../../domain/aircraft-model'

@Injectable()
export class RegisterAircraftModelUseCase {
  constructor(
    private readonly repository: AircraftModelRepository
  ) {}

  async invoke(input: RegisterAircraftModelInput): Promise<void> {
    const modelExists = await this.repository.exists(input.code)

    if (modelExists) {
      throw new AlreadyExistsError('AircraftModel', 'code', input.code)
    }

    const aircraftModel = AircraftModel.create({
      id: input.id,
      name: input.name,
      code: input.code,
      manufacturer: input.manufacturer,
      passengerCapacity: input.passengerCapacity,
      numEngines: input.numEngines
    })

    await this.repository.register(aircraftModel)
  }
}
