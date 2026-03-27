import { isValidUuidV7 } from 'src/modules/shared/domain/validators/validateId'
import { FleetError } from './fleet-errors'
import { FleetCreateProps, FleetProps } from './fleet-types'
import { OperationRegion, FleetType, FleetStatus } from './fleet-enums'
import { FLEET_CONSTRAINTS as LIMITS } from './fleet-constants'

export class Fleet {
  private _status: FleetStatus

  readonly id: string
  readonly aircraftIds: string[]
  readonly companyId: string
  readonly name: string
  readonly type: FleetType
  readonly operationRegion: OperationRegion
  readonly maintenanceBudget: number

  private constructor(props: FleetProps) {
    this.id = props.id
    this.aircraftIds = props.aircraftIds
    this.companyId = props.companyId
    this.name = props.name
    this.type = props.type
    this.operationRegion = props.operationRegion
    this.maintenanceBudget = props.maintenanceBudget
    this._status = props.status
  }

  //#region ... Getters & Setters ...
  get status(): FleetStatus {
    return this._status
  }

  set status(value: FleetStatus) {
    this.validateStatus(value)
    this._status = value
  }
  //#endregion

  static create(props: FleetCreateProps): Fleet {
    this.validateId(props.id)
    this.validateCompanyId(props.companyId)
    this.validateName(props.name)
    this.validateType(props.type)
    this.validateOperationRegion(props.operationRegion)
    this.validateMaintenanceBudget(props.maintenanceBudget)
    this.ensureHasAircrafts(props.aircraftIds)

    return new Fleet({
      ...props,
      status: FleetStatus.DRAFT
    })
  }

  static reconstruct(props: FleetProps): Fleet {
    return new Fleet(props)
  }

  addAircraft(aircraftId: string): void {
    if (this.aircraftIds.includes(aircraftId)) {
      throw new FleetError(`Aircraft with id ${aircraftId} is already part of the fleet`)
    }
    this.aircraftIds.push(aircraftId)
  }

  retireAircraft(aircraftId: string): void {
    this.ensureAircraftIsPartOfFleet(aircraftId)
    const index = this.aircraftIds.indexOf(aircraftId)
    this.aircraftIds.splice(index, 1)
  }

  prepareForRetire(): void {
    if (this._status === FleetStatus.RETIRED) {
      throw new FleetError('Fleet is already retired')
    }
    this._status = FleetStatus.RETIRED
  }

  private static validateId(id: string): void {
    if (!isValidUuidV7(id)) {
      throw new FleetError('Invalid id')
    }
  }

  private static validateCompanyId(companyId: string): void {
    if (!isValidUuidV7(companyId)) {
      throw new FleetError('Invalid company id')
    }
  }

  private static validateName(name: string): void {
    if (!name || !name.trim().length) {
      throw new FleetError('Name cannot be empty')
    }

    if (name.length < LIMITS.NAME.MIN_LENGTH) {
      throw new FleetError(`Name must be at least ${LIMITS.NAME.MIN_LENGTH} characters`)
    }

    if (name.length > LIMITS.NAME.MAX_LENGTH) {
      throw new FleetError(`Name must be less than or equal to ${LIMITS.NAME.MAX_LENGTH} characters`)
    }
  }

  private static validateMaintenanceBudget(budget: number): void {
    if (isNaN(budget) || !Number.isInteger(budget)) {
      throw new FleetError('Invalid maintenance budget')
    }

    if (budget < LIMITS.MAINTENANCE_BUDGET.MIN) {
      throw new FleetError(`Maintenance budget must be at least ${LIMITS.MAINTENANCE_BUDGET.MIN}`)
    }

    if (budget > LIMITS.MAINTENANCE_BUDGET.MAX) {
      throw new FleetError(`Maintenance budget must be less than ${LIMITS.MAINTENANCE_BUDGET.MAX}`)
    }
  }

  private static validateOperationRegion(value: string): void {
    if (!(value in OperationRegion)) {
      throw new FleetError(`Invalid operation region: ${value}`)
    }
  }

  private static validateType(value: string): void {
    if (!(value in FleetType)) {
      throw new FleetError(`Invalid fleet type: ${value}`)
    }
  }

  private static ensureHasAircrafts(ids: string[]): void {
    if (!ids.length) {
      throw new FleetError('A fleet must be registered with at least one aircraft')
    }
  }

  private validateStatus(value: string): void {
    if (!Object.values(FleetStatus).includes(value as FleetStatus)) {
      throw new FleetError(`Invalid fleet status: ${value}`)
    }
  }

  private ensureAircraftIsPartOfFleet(aircraftId: string): void {
    if (!this.aircraftIds.includes(aircraftId)) {
      throw new FleetError(`Aircraft with id ${aircraftId} is not part of the fleet`)
    }
  }
}
