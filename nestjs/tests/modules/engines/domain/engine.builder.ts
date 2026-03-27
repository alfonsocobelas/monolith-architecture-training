import { v7 as uuidv7 } from 'uuid'
import { Engine } from 'src/modules/engines/domain/engine'
import { EngineProps } from 'src/modules/engines/domain/engine-types'
import { EngineStatus } from 'src/modules/engines/domain/engine-enums'
import { randomString } from '../../shared/utils/random-string'
import { ENGINE_DEFAULTS as DEFAULT, ENGINE_CONSTRAINTS as LIMITS } from 'src/modules/engines/domain/engine-constants'
import { randomNumber } from '../../shared/utils/random-number'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class EngineBuilder {
  private props: EngineProps = {
    id: uuidv7(),
    serialNumber: randomString(LIMITS.SERIAL_NUMBER.MIN_LENGTH, LIMITS.SERIAL_NUMBER.MAX_LENGTH).trim().toUpperCase(),
    healthScore: randomNumber(LIMITS.HEALTH_SCORE.MIN, LIMITS.HEALTH_SCORE.MAX),
    flyingHoursAccumulated: DEFAULT.FLYING_HOURS,
    cyclesSinceLastOverhaul: DEFAULT.CYCLES_SINCE_LAST_OVERHAUL,
    status: EngineStatus.OPERATIONAL,
    isInstalled: false
  }

  static anEngine(): EngineBuilder {
    return new EngineBuilder()
  }

  withId(id: string) {
    this.props.id = id
    return this
  }

  withSerialNumber(sn: string) {
    this.props.serialNumber = sn
    return this
  }

  withStatus(status: EngineStatus) {
    this.props.status = status
    return this
  }

  withHealth(score: number) {
    this.props.healthScore = score
    return this
  }

  withAircraftId(aircraftId: string) {
    this.props.isInstalled = true
    this.props.aircraftId = aircraftId
    return this
  }

  withIsInstalled(isInstalled: boolean) {
    this.props.isInstalled = isInstalled
    return this
  }

  withProps(overrides?: Partial<EngineProps>): EngineBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Engine {
    return Engine.create({
      id: this.props.id,
      serialNumber: this.props.serialNumber
    })
  }

  build(): Engine {
    return Engine.reconstruct(this.props)
  }
}
