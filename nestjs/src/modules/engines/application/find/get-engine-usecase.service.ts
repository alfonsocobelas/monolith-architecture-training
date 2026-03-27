import { EntityNotFoundError } from 'src/common/errors'
import { GetEngineInput } from './get-engine-input.dto'
import { GetEngineOutput } from './get-engine-output.dto'
import { EngineRepository } from '../../domain/engine.repository'

export class GetEngineUseCase {
  constructor(
    private readonly engineRepository: EngineRepository
  ) {}

  async invoke(input: GetEngineInput): Promise<GetEngineOutput> {
    const engine = await this.engineRepository.get(input.id)

    if (!engine) {
      throw new EntityNotFoundError('Engine', input.id)
    }

    return {
      id: engine.id,
      healthScore: engine.healthScore,
      serialNumber: engine.serialNumber,
      flyingHoursAccumulated: engine.flyingHoursAccumulated,
      cyclesSinceLastOverhaul: engine.cyclesSinceLastOverhaul,
      isInstalled: engine.isInstalled,
      status: engine.status,
      aircraftId: engine.aircraftId ?? null
    }
  }
}
