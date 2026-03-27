import { normalizeString } from 'src/modules/shared/utils/normalize'
import { isValidUuidV7 } from 'src/modules/shared/domain/validators/validateId'
import { AircraftModelStatus } from './aircraft-model-enums'
import { AircraftModelError } from './aircraft-model-errors'
import { AircraftModelCreateProps, AircraftModelProps } from './aircraft-model-types'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from './aircraft-model-constants'

export class AircraftModel {
  private _status: AircraftModelStatus

  readonly id: string
  readonly name: string
  readonly code: string
  readonly manufacturer: string
  readonly passengerCapacity: number
  readonly numEngines: number

  private constructor(props: AircraftModelProps) {
    this.id = props.id
    this.name = props.name
    this.code = props.code
    this.manufacturer = props.manufacturer
    this.passengerCapacity = props.passengerCapacity
    this.numEngines = props.numEngines
    this._status = props.status
  }

  //#region ... Getters & Setters ...
  get status(): AircraftModelStatus {
    return this._status
  }

  set status(value: AircraftModelStatus) {
    this.validateStatus(value)
    this._status = value
  }
  //#endregion

  static create(props: AircraftModelCreateProps): AircraftModel {
    const code = normalizeString(props.code)

    this.validateId(props.id)
    this.validateCode(code)
    this.validateName(props.name)
    this.validateManufacturer(props.manufacturer)
    this.validateNumEngines(props.numEngines)
    this.validatePassengerCapacity(props.passengerCapacity)

    return new AircraftModel({
      ...props,
      code,
      status: AircraftModelStatus.DRAFT
    })
  }

  static reconstruct(props: AircraftModelProps): AircraftModel {
    return new AircraftModel(props)
  }

  ensureCanBeRemoved(totalAircraftCount: number): void {
    if (totalAircraftCount > 0) {
      throw new AircraftModelError('Cannot remove model with associated aircraft')
    }
  }

  private static validateId(id: string): void {
    if (!isValidUuidV7(id)) {
      throw new AircraftModelError('Invalid id')
    }
  }

  private static validateName(name: string): void {
    if (!name || !name.trim().length) {
      throw new AircraftModelError('Name cannot be empty')
    }

    if (name.length < LIMITS.NAME.MIN_LENGTH) {
      throw new AircraftModelError(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
    }

    if (name.length > LIMITS.NAME.MAX_LENGTH) {
      throw new AircraftModelError(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
    }
  }

  private static validateCode(code: string): void {
    if (!code || !code.length) {
      throw new AircraftModelError('Code cannot be empty')
    }
    if (code.length < LIMITS.CODE.MIN_LENGTH) {
      throw new AircraftModelError(`Code must be at least ${LIMITS.CODE.MIN_LENGTH} characters`)
    }

    if (code.length > LIMITS.CODE.MAX_LENGTH) {
      throw new AircraftModelError(`Code must be less than or equal to ${LIMITS.CODE.MAX_LENGTH} characters`)
    }
  }

  private static validateManufacturer(manufacturer: string): void {
    if (!manufacturer || !manufacturer.trim().length) {
      throw new AircraftModelError('Manufacturer cannot be empty')
    }

    if (manufacturer.length < LIMITS.MANUFACTURER.MIN_LENGTH) {
      throw new AircraftModelError(`Manufacturer must be at least ${LIMITS.MANUFACTURER.MIN_LENGTH} characters`)
    }

    if (manufacturer.length > LIMITS.MANUFACTURER.MAX_LENGTH) {
      throw new AircraftModelError(
        `Manufacturer must be less than or equal to ${LIMITS.MANUFACTURER.MAX_LENGTH} characters`
      )
    }
  }

  private static validateNumEngines(numEngines: number): void {
    if (isNaN(numEngines) || !Number.isInteger(numEngines)) {
      throw new AircraftModelError('Number of engines must be an integer')
    }

    if (numEngines < LIMITS.ENGINES.MIN) {
      throw new AircraftModelError(`Number of engines must be greater than or equal to ${LIMITS.ENGINES.MIN}`)
    }

    if (numEngines > LIMITS.ENGINES.MAX) {
      throw new AircraftModelError(`Number of engines must be less than or equal to ${LIMITS.ENGINES.MAX}`)
    }
  }

  private static validatePassengerCapacity(passengerCapacity: number): void {
    if (isNaN(passengerCapacity) || !Number.isInteger(passengerCapacity)) {
      throw new AircraftModelError('Passenger capacity must be an integer')
    }

    if (passengerCapacity < LIMITS.PASSENGERS.MIN) {
      throw new AircraftModelError(`Passenger capacity must be greater than or equal to ${LIMITS.PASSENGERS.MIN}`)
    }

    if (passengerCapacity > LIMITS.PASSENGERS.MAX) {
      throw new AircraftModelError(`Passenger capacity must be less than or equal to ${LIMITS.PASSENGERS.MAX}`)
    }
  }

  private validateStatus(value: AircraftModelStatus): void {
    if (!(value in AircraftModelStatus)) {
      throw new AircraftModelError('Invalid status')
    }
  }
}
