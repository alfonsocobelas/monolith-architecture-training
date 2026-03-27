import { isValidUuidV7 } from 'src/modules/shared/domain/validators/validateId'
import { normalizeString } from 'src/modules/shared/utils/normalize'
import { AircraftStatus } from './aircraft-enums'
import { AircraftError } from './aircraft-errors'
import { AircraftProps, AircraftCreateProps } from './aircraft-types'
import { AIRCRAFT_DEFAULTS as DEFAULTS, AIRCRAFT_CONSTRAINTS as LIMITS } from './aircraft-constants'

export class Aircraft {
  private _fleetId?: string
  private _engineIds: string[]
  private _status: AircraftStatus
  private _isActive: boolean
  private _totalFlightHours: number
  private _fuelLevelPercentage: number

  readonly id: string
  readonly modelId: string
  readonly tailNumber: string

  private constructor(props: AircraftProps) {
    this.id = props.id
    this.modelId = props.modelId
    this.tailNumber = props.tailNumber
    this._fleetId = props.fleetId
    this._engineIds = props.engineIds
    this._status = props.status
    this._isActive = props.isActive
    this._totalFlightHours = props.totalFlightHours
    this._fuelLevelPercentage = props.fuelLevelPercentage
  }

  //#region ... Getters & Setters ...
  get totalFlightHours(): number {
    return this._totalFlightHours
  }

  set totalFlightHours(newTotalFlightHours: number) {
    this.validateTotalFlightHours(newTotalFlightHours)
    this._totalFlightHours = newTotalFlightHours
  }

  get fuelLevelPercentage(): number {
    return this._fuelLevelPercentage
  }

  set fuelLevelPercentage(newFuelLevelPercentage: number) {
    this.validateFuelLevel(newFuelLevelPercentage)
    this._fuelLevelPercentage = newFuelLevelPercentage
  }

  get status(): AircraftStatus {
    return this._status
  }

  set status(newStatus: AircraftStatus) {
    this.validateStatus(newStatus)
    this._status = newStatus
  }

  get isActive(): boolean {
    return this._isActive
  }

  set isActive(value: boolean) {
    this._isActive = value
  }

  get engineIds(): string[] {
    return this._engineIds
  }

  get fleetId(): string | undefined {
    return this._fleetId
  }
  //#endregion

  static create(props: AircraftCreateProps): Aircraft {
    const tailNumber = normalizeString(props.tailNumber)

    this.validateId(props.id)
    this.validateModelId(props.modelId)
    this.validateTailNumber(tailNumber)

    return new Aircraft({
      ...props,
      tailNumber,
      isActive: false,
      engineIds: DEFAULTS.INITIAL_ENGINE_IDS,
      totalFlightHours: LIMITS.FLIGHT_HOURS.MIN,
      fuelLevelPercentage: LIMITS.FUEL_LEVEL.MIN,
      status: AircraftStatus.DRAFT
    })
  }

  static reconstruct(props: AircraftProps): Aircraft {
    return new Aircraft(props)
  }

  installEngine(engineId: string, numEngines: number): void {
    this.ensureEngineCanBeInstalled(engineId, numEngines)
    this._engineIds.push(engineId)
  }

  removeEngine(engineId: string): void {
    this.ensureEngineCanBeRemoved(engineId)
    const index = this._engineIds.indexOf(engineId)
    this._engineIds.splice(index, 1)
  }

  addToFleet(fleetId: string): void {
    this.ensureCanAddToFleet()
    this._fleetId = fleetId
  }

  retireFromFleet(fleetId: string): void {
    this.ensureCanRetireFromFleet(fleetId)
    this._fleetId = undefined
  }

  private static validateId(id: string): void {
    if (!isValidUuidV7(id)) {
      throw new AircraftError('Invalid id')
    }
  }

  private static validateModelId(modelId: string): void {
    if (!isValidUuidV7(modelId)) {
      throw new AircraftError('Invalid modelId')
    }
  }

  private static validateTailNumber(tailNumber: string): void {
    if (!tailNumber || !tailNumber.length) {
      throw new AircraftError('Tail number cannot be empty')
    }

    if (tailNumber.length < LIMITS.TAIL_NUMBER.MIN_LENGTH) {
      throw new AircraftError(`Tail number must be at least ${LIMITS.TAIL_NUMBER.MIN_LENGTH} characters`)
    }

    if (tailNumber.length > LIMITS.TAIL_NUMBER.MAX_LENGTH) {
      throw new AircraftError(`Tail number must be less than or equal to ${LIMITS.TAIL_NUMBER.MAX_LENGTH} characters`)
    }
  }

  private ensureEngineCanBeInstalled(engineId: string, numEngines: number): void {
    if (this.status !== AircraftStatus.ACTIVE && this.status !== AircraftStatus.MAINTENANCE) {
      throw new AircraftError('Engines can only be installed on active or in-maintenance aircraft.')
    }

    if (this._engineIds.length >= numEngines) {
      throw new AircraftError('Cannot install more engines than the model allows.')
    }

    if (this._engineIds.includes(engineId)) {
      throw new AircraftError(`Engine with ID ${engineId} is already installed on aircraft ${this.id}.`)
    }
  }

  private ensureEngineCanBeRemoved(engineId: string): void {
    if (this.status == AircraftStatus.ACTIVE) {
      throw new AircraftError('Engines can only be removed from in-maintenance aircraft.')
    }

    if (!this._engineIds.includes(engineId)) {
      throw new AircraftError(`Engine with ID ${engineId} is not installed on aircraft ${this.id}.`)
    }
  }

  private ensureCanAddToFleet(): void {
    if (this._fleetId) {
      throw new AircraftError(`Aircraft is already assigned to fleet ${this._fleetId}.`)
    }
  }

  private ensureCanRetireFromFleet(fleetId: string): void {
    if (this._fleetId !== fleetId) {
      throw new AircraftError(`Aircraft is not assigned to fleet ${fleetId}.`)
    }
  }

  private validateTotalFlightHours(totalFlightHours: number): void {
    if (isNaN(totalFlightHours) || !Number.isInteger(totalFlightHours)) {
      throw new AircraftError('Total flight hours must be an integer.')
    }

    if (totalFlightHours < LIMITS.FLIGHT_HOURS.MIN) {
      throw new AircraftError(`Total flight hours must be greater than or equal to ${LIMITS.FLIGHT_HOURS.MIN}.`)
    }

    if (totalFlightHours > LIMITS.FLIGHT_HOURS.MAX) {
      throw new AircraftError(`Total flight hours must be less than or equal to ${LIMITS.FLIGHT_HOURS.MAX}.`)
    }
  }

  private validateFuelLevel(fuelLevelPercentage: number): void {
    if (isNaN(fuelLevelPercentage) || !Number.isInteger(fuelLevelPercentage)) {
      throw new AircraftError('Fuel level percentage must be an integer.')
    }

    if (fuelLevelPercentage < LIMITS.FUEL_LEVEL.MIN) {
      throw new AircraftError(`Fuel level percentage must be greater than or equal to ${LIMITS.FUEL_LEVEL.MIN}.`)
    }

    if (fuelLevelPercentage > LIMITS.FUEL_LEVEL.MAX) {
      throw new AircraftError(`Fuel level percentage must be less than or equal to ${LIMITS.FUEL_LEVEL.MAX}.`)
    }
  }

  private validateStatus(status: AircraftStatus): void {
    if (!Object.values(AircraftStatus).includes(status)) {
      throw new AircraftError(`Invalid aircraft status: ${status}`)
    }
  }
}
