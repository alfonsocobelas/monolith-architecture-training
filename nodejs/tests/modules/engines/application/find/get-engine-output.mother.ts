import { GetEngineOutput } from 'src/modules/engines/application/find/get-engine-output.dto'
import { Engine } from 'src/modules/engines/domain/engine'

export class GetEngineOutputMother {
  static fromDomain(engine: Engine): GetEngineOutput {
    return {
      id: engine.id,
      healthScore: engine.healthScore,
      serialNumber: engine.serialNumber,
      flyingHoursAccumulated: engine.flyingHoursAccumulated,
      cyclesSinceLastOverhaul: engine.cyclesSinceLastOverhaul,
      isInstalled: engine.isInstalled,
      status: engine.status ?? null,
      aircraftId: engine.aircraftId ?? null
    }
  }
}
