import { v7 as uuidv7 } from 'uuid'
import { RegisterAircraftModelInput } from 'src/modules/aircraft-models/application/create/register-aircraft-model-input.dto'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from 'src/modules/aircraft-models/domain/aircraft-model-constants'
import { randomString } from '../../../shared/utils/random-string'
import { randomNumber } from '../../../shared/utils/random-number'

export class RegisterAircraftModelInputMother {
  static create(overrides?: Partial<RegisterAircraftModelInput>): RegisterAircraftModelInput {
    return {
      id: uuidv7(),
      name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
      code: randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH).trim().toUpperCase(),
      manufacturer: randomString(LIMITS.MANUFACTURER.MIN_LENGTH, LIMITS.MANUFACTURER.MAX_LENGTH),
      passengerCapacity: randomNumber(LIMITS.PASSENGERS.MIN, LIMITS.PASSENGERS.MAX),
      numEngines: randomNumber(LIMITS.ENGINES.MIN, LIMITS.ENGINES.MAX),
      ...overrides
    }
  }

  static random(): RegisterAircraftModelInput {
    return this.create()
  }

  static withExistingCode(code: string): RegisterAircraftModelInput {
    return this.create({ code })
  }
}
