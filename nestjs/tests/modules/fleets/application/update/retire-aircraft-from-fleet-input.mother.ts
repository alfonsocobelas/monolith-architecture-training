import { v7 as uuidv7 } from 'uuid'
import { RetireAircraftFromFleetInput } from 'src/modules/fleets/application/update/retire-aircraft-from-fleet-input'

export class RetireAircraftFromFleetInputMother {
  static create(fleetId: string, aircraftId: string): RetireAircraftFromFleetInput {
    return { fleetId, aircraftId }
  }

  static random(): RetireAircraftFromFleetInput {
    const fleetId = uuidv7()
    const aircraftId = uuidv7()
    return this.create(fleetId, aircraftId)
  }
}
