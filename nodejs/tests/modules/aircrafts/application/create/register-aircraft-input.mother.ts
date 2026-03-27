import { v7 as uuidv7 } from 'uuid'
import { RegisterAircraftInput } from 'src/modules/aircrafts/application/create/register-aircraft-input.dto'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from 'src/modules/aircrafts/domain/aircraft-constants'
import { randomString } from '../../../shared/utils/random-string'

export class RegisterAircraftInputMother {
  static create(overrides?: Partial<RegisterAircraftInput>): RegisterAircraftInput {
    return {
      id: uuidv7(),
      modelId: uuidv7(),
      tailNumber: randomString(LIMITS.TAIL_NUMBER.MIN_LENGTH, LIMITS.TAIL_NUMBER.MAX_LENGTH).trim().toUpperCase(),
      ...overrides
    }
  }

  static random(): RegisterAircraftInput {
    return this.create()
  }

  static withModelId(modelId: string): RegisterAircraftInput {
    return this.create({ modelId })
  }

  static withTailNumber(tailNumber: string): RegisterAircraftInput {
    return this.create({ tailNumber })
  }
}
