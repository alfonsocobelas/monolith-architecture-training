import { isValidUuidV7 } from 'src/modules/shared/domain/validators/validateId'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { EngineCreateProps, EngineProps } from './engine-types'
import { EngineStatus } from './engine-enums'
import { EngineError } from './engine-errors'
import { ENGINE_DEFAULTS as DEFAULT, ENGINE_CONSTRAINTS as LIMITS } from './engine-constants'

export class Engine {
  private _aircraftId?: string
  private _isInstalled: boolean
  private _status: EngineStatus

  readonly id: string
  readonly serialNumber: string
  readonly healthScore: number
  readonly flyingHoursAccumulated: number
  readonly cyclesSinceLastOverhaul: number

  private constructor(props: EngineProps) {
    this.id = props.id
    this.serialNumber = props.serialNumber
    this.healthScore = props.healthScore
    this.flyingHoursAccumulated = props.flyingHoursAccumulated
    this.cyclesSinceLastOverhaul = props.cyclesSinceLastOverhaul
    this._status = props.status
    this._isInstalled = props.isInstalled
    this._aircraftId = props.aircraftId
  }

  //#region ... Getters & Setters ...
  get isInstalled(): boolean {
    return this._isInstalled
  }

  get aircraftId(): string | undefined {
    return this._aircraftId
  }

  get status(): EngineStatus {
    return this._status
  }

  set status(newStatus: EngineStatus) {
    this.validateStatus(newStatus)
    this._status = newStatus
  }
  //#endregion

  static create(props: EngineCreateProps): Engine {
    const serialNumber = normalizeString(props.serialNumber)

    this.validateId(props.id)
    this.validateSerialNumber(serialNumber)

    return new Engine({
      ...props,
      serialNumber,
      isInstalled: false,
      healthScore: LIMITS.HEALTH_SCORE.MAX,
      flyingHoursAccumulated: DEFAULT.FLYING_HOURS,
      cyclesSinceLastOverhaul: DEFAULT.CYCLES_SINCE_LAST_OVERHAUL,
      status: EngineStatus.OPERATIONAL
    })
  }

  static reconstruct(props: EngineProps): Engine {
    return new Engine(props)
  }

  installInAircraft(aircraftId: string): void {
    this.ensureCanBeInstalled()
    this._isInstalled = true
    this._aircraftId = aircraftId
  }

  removeFromAircraft(aircraftId: string): void {
    this.ensureCanBeRemoved(aircraftId)
    this._isInstalled = false
    this._aircraftId = undefined
  }

  private static validateId(id: string): void {
    if (!isValidUuidV7(id)) {
      throw new EngineError('Invalid id')
    }
  }

  private static validateSerialNumber(serialNumber: string): void {
    if (!serialNumber || !serialNumber.trim().length) {
      throw new EngineError('Serial number cannot be empty')
    }

    if (serialNumber.length < LIMITS.SERIAL_NUMBER.MIN_LENGTH) {
      throw new EngineError(`Serial number must be at least ${LIMITS.SERIAL_NUMBER.MIN_LENGTH} characters`)
    }

    if (serialNumber.length > LIMITS.SERIAL_NUMBER.MAX_LENGTH) {
      throw new EngineError(`Serial number must be less than or equal to ${LIMITS.SERIAL_NUMBER.MAX_LENGTH} characters`)
    }
  }

  private validateStatus(value: string): void {
    if (!Object.values(EngineStatus).includes(value as EngineStatus)) {
      throw new EngineError(`Invalid engine status: ${value}`)
    }
  }

  private ensureCanBeInstalled(): void {
    if (this.isInstalled) {
      throw new EngineError(`Engine ${this.id} is already installed on the other aircraft`)
    }

    if (this.status !== EngineStatus.OPERATIONAL) {
      throw new EngineError('Only operational engines can be installed')
    }

    if (this.healthScore < LIMITS.HEALTH_SCORE.MIN) {
      throw new EngineError(`Engine health score must be at least ${LIMITS.HEALTH_SCORE.MIN} to be installed`)
    }
  }

  private ensureCanBeRemoved(aircraftId: string): void {
    if (!this.isInstalled) {
      throw new EngineError(`Engine ${this.id} is not installed on any aircraft`)
    }

    if (this._aircraftId !== aircraftId) {
      throw new EngineError(`Engine ${this.id} is installed on a different aircraft`)
    }
  }
}
