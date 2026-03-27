import { Injectable } from '@nestjs/common'
import { GetAircraftModelInput } from './get-aircraft-model-input.dto'
import { GetAircraftModelOutput } from './get-aircraft-model-output.dto'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'
import { EntityNotFoundError } from '../../../../common/errors'

@Injectable()
export class GetAircraftModelUseCase {
  constructor(
    private readonly repository: AircraftModelRepository
  ) {}

  async invoke(input: GetAircraftModelInput): Promise<GetAircraftModelOutput> {
    const model = await this.repository.get(input.id)

    if (!model) {
      throw new EntityNotFoundError('AircraftModel', input.id)
    }

    return {
      id: model.id,
      name: model.name,
      code: model.code,
      manufacturer: model.manufacturer,
      passengerCapacity: model.passengerCapacity,
      numEngines: model.numEngines,
      status: model.status
    }
  }
}
