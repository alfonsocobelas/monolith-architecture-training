import { v7 as uuidv7 } from 'uuid'
import { Fleet } from 'src/modules/fleets/domain/fleet'
import { FleetProps } from 'src/modules/fleets/domain/fleet-types'
import { FLEET_CONSTRAINTS as LIMITS } from 'src/modules/fleets/domain/fleet-constants'
import { FleetStatus, FleetType, OperationRegion } from 'src/modules/fleets/domain/fleet-enums'
import { randomEnumValue } from '../../shared/utils/random-enum'
import { randomString } from '../../shared/utils/random-string'
import { randomNumber } from '../../shared/utils/random-number'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class FleetBuilder {
  private props: FleetProps = {
    id: uuidv7(),
    companyId: uuidv7(),
    aircraftIds: [uuidv7(), uuidv7()],
    name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
    maintenanceBudget: randomNumber(LIMITS.MAINTENANCE_BUDGET.MIN, LIMITS.MAINTENANCE_BUDGET.MAX),
    type: randomEnumValue(FleetType),
    operationRegion: randomEnumValue(OperationRegion),
    status: FleetStatus.DRAFT
  }

  static aFleet(): FleetBuilder {
    return new FleetBuilder()
  }

  withId(id: string): FleetBuilder {
    this.props.id = id
    return this
  }

  withCompanyId(companyId: string): FleetBuilder {
    this.props.companyId = companyId
    return this
  }

  withAircraftIds(aircraftIds: string[]): FleetBuilder {
    this.props.aircraftIds = aircraftIds
    return this
  }

  withName(name: string): FleetBuilder {
    this.props.name = name
    return this
  }

  withOperationRegion(operationRegion: OperationRegion): FleetBuilder {
    this.props.operationRegion = operationRegion
    return this
  }

  withType(type: FleetType): FleetBuilder {
    this.props.type = type
    return this
  }

  withMaintenanceBudget(maintenanceBudget: number): FleetBuilder {
    this.props.maintenanceBudget = maintenanceBudget
    return this
  }

  withStatus(status: FleetStatus): FleetBuilder {
    this.props.status = status
    return this
  }

  withProps(overrides?: Partial<FleetProps>): FleetBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): Fleet {
    return Fleet.create({
      id: this.props.id,
      companyId: this.props.companyId,
      aircraftIds: this.props.aircraftIds,
      name: this.props.name,
      type: this.props.type,
      operationRegion: this.props.operationRegion,
      maintenanceBudget: this.props.maintenanceBudget
    })
  }

  build(): Fleet {
    return Fleet.reconstruct(this.props)
  }
}
