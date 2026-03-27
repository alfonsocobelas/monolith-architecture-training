import { v7 as uuidv7 } from 'uuid'
import { RetireAircraftsFromFleetInput } from 'src/modules/fleets/application/update/retire-aircrafts-from-fleet-input.dto'

export class RetireAircraftsFromFleetInputMother {
  static create(fleetId: string, aircraftIds: string[]): RetireAircraftsFromFleetInput {
    return { fleetId, aircraftIds }
  }

  static random(): RetireAircraftsFromFleetInput {
    const fleetId = uuidv7()
    const aircraftIds = [uuidv7(), uuidv7()]
    return this.create(fleetId, aircraftIds)
  }
}
