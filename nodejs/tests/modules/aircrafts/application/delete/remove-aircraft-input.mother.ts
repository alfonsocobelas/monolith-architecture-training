import { RemoveAircraftInput } from 'src/modules/aircrafts/application/delete/remove-aircraft-input.dto'
import { v7 as uuidv7 } from 'uuid'

export class RemoveAircraftInputMother {
  static create(id: string): RemoveAircraftInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
