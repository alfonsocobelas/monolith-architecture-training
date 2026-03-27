import { v7 as uuidv7 } from 'uuid'
import { GetFleetInput } from 'src/modules/fleets/application/find/get-fleet-input.dto'

export class GetFleetInputMother {
  static create(id: string): GetFleetInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
