import { EntityNotFoundError } from 'src/common/errors'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { EngineRepository } from 'src/modules/engines/domain/engine.repository'
import { RemoveEngineFromAircraftInput } from './remove-engine-from-aircraft-input.dto'

export class RemoveEngineFromAircraftUsecase {
  constructor(
    private readonly engineRepository: EngineRepository,
    private readonly aircraftRepository: AircraftRepository
  ) {}

  async invoke(input: RemoveEngineFromAircraftInput): Promise<void> {
    const [engine, aircraft] = await Promise.all([
      this.engineRepository.get(input.engineId),
      this.aircraftRepository.get(input.aircraftId)
    ])

    if (!engine) {
      throw new EntityNotFoundError('Engine', input.engineId)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.aircraftId)
    }

    aircraft.removeEngine(input.engineId)
    engine.removeFromAircraft(input.aircraftId)

    await Promise.all([
      this.aircraftRepository.save(aircraft),
      this.engineRepository.save(engine)
    ])
  }
}
