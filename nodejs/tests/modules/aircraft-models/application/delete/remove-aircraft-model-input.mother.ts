import { RemoveAircraftModelInput } from 'src/modules/aircraft-models/application/delete/remove-aircraft-model-input.dto'
import { v7 as uuidv7 } from 'uuid'

export class RemoveAircraftModelInputMother {
  static create(id: string): RemoveAircraftModelInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
