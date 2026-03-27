import { v7 as uuidv7 } from 'uuid'
import { RegisterFleetInput } from 'src/modules/fleets/application/create/register-fleet-input.dto'
import { FleetType, OperationRegion } from 'src/modules/fleets/domain/fleet-enums'
import { FLEET_CONSTRAINTS as LIMITS } from 'src/modules/fleets/domain/fleet-constants'
import { randomString } from '../../../shared/utils/random-string'
import { randomNumber } from '../../../shared/utils/random-number'
import { randomEnumValue } from '../../../shared/utils/random-enum'

export class RegisterFleetInputMother {
  static create(overrides?: Partial<RegisterFleetInput>): RegisterFleetInput {
    return {
      id: uuidv7(),
      companyId: uuidv7(),
      aircraftIds: [uuidv7(), uuidv7()],
      name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
      maintenanceBudget: randomNumber(LIMITS.MAINTENANCE_BUDGET.MIN, LIMITS.MAINTENANCE_BUDGET.MAX),
      type: randomEnumValue(FleetType).toString(),
      operationRegion: randomEnumValue(OperationRegion).toString(),
      ...overrides
    }
  }

  static random(): RegisterFleetInput {
    return this.create()
  }

  static withExistingAircraftIds(aircraftIds: string[]): RegisterFleetInput {
    return this.create({ aircraftIds })
  }
}
