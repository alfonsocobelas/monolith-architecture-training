import { EntityNotFoundError } from 'src/common/errors'
import { GetAircraftInput } from './get-aircraft-input.dto'
import { GetAircraftOutput } from './get-aircraft-output.dto'
import { AircraftRepository } from '../../domain/aircraft.repository'

export default class GetAircraftUseCase {
  constructor(private readonly repository: AircraftRepository) {}

  async invoke(input: GetAircraftInput): Promise<GetAircraftOutput> {
    const aircraft = await this.repository.getTechnicalSheet(input.id)

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.id)
    }

    return {
      id: aircraft.id,
      modelId: aircraft.modelId,
      tailNumber: aircraft.tailNumber,
      totalFlightHours: aircraft.totalFlightHours,
      fuelLevelPercentage: aircraft.fuelLevelPercentage,
      status: aircraft.status,
      model: {
        id: aircraft.model.id,
        name: aircraft.model.name,
        numEngines: aircraft.model.numEngines
      },
      engines: aircraft.engines.map(engine => ({
        id: engine.id,
        healthScore: engine.healthScore
      }))
    }
  }
}
