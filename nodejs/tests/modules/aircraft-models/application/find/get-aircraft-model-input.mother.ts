import { v7 as uuidv7 } from 'uuid'

export class GetAircraftModelInputMother {
  static create(id: string) {
    return { id }
  }

  static random() {
    const id = uuidv7()
    return this.create(id)
  }
}
