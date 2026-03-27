import { v7 as uuidv7 } from 'uuid'
import { AddAircraftToFleetInput } from 'src/modules/fleets/application/update/add-aircraft-to-fleet-input.dto'

export class AddAircraftToFleetInputMother {
  static create(fleetId: string, aircraftId: string): AddAircraftToFleetInput {
    return { fleetId, aircraftId }
  }

  static random(): AddAircraftToFleetInput {
    const fleetId = uuidv7()
    const aircraftId = uuidv7()
    return this.create(fleetId, aircraftId)
  }
}
