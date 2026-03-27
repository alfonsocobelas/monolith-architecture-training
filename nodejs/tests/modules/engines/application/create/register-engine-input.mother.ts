import { v7 as uuidv7 } from 'uuid'
import { RegisterEngineInput } from 'src/modules/engines/application/create/register-engine-input.dto'
import { ENGINE_CONSTRAINTS as LIMITS } from 'src/modules/engines/domain/engine-constants'
import { randomString } from '../../../shared/utils/random-string'

export class RegisterEngineInputMother {
  static create(overrides?: Partial<RegisterEngineInput>): RegisterEngineInput {
    return {
      id: uuidv7(),
      serialNumber: randomString(LIMITS.SERIAL_NUMBER.MIN_LENGTH, LIMITS.SERIAL_NUMBER.MAX_LENGTH).trim().toUpperCase(),
      ...overrides
    }
  }

  static random(): RegisterEngineInput {
    return this.create()
  }

  static withExistingSerialNumber(serialNumber: string): RegisterEngineInput {
    return this.create({ serialNumber })
  }
}
