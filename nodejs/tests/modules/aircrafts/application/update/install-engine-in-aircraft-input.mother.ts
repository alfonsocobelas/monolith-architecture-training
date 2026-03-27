import { InstallEngineInAircraftInput } from 'src/modules/aircrafts/application/update/install-engine-in-aircraft-input.dto'
import { v7 as uuidv7 } from 'uuid'

export class InstallEngineInAircraftInputMother {
  static create(engineId: string, aircraftId: string): InstallEngineInAircraftInput {
    return {
      engineId,
      aircraftId
    }
  }

  static random(): InstallEngineInAircraftInput {
    const engineId = uuidv7()
    const aircraftId = uuidv7()
    return this.create(engineId, aircraftId)
  }
}
