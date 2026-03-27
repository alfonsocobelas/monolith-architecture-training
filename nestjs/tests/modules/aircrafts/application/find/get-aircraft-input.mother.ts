import { GetAircraftInput } from 'src/modules/aircrafts/application/find/get-aircraft-input.dto'
import { v7 as uuidv7 } from 'uuid'

export class GetAircraftInputMother {
  static create(id: string): GetAircraftInput {
    return { id }
  }

  static random(): GetAircraftInput {
    const id = uuidv7()
    return this.create(id)
  }
}
