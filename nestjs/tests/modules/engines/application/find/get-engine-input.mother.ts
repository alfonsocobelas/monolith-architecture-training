import { v7 as uuidv7 } from 'uuid'
import { GetEngineInput } from 'src/modules/engines/application/find/get-engine-input.dto'

export class GetEngineInputMother {
  static create(id: string): GetEngineInput {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
