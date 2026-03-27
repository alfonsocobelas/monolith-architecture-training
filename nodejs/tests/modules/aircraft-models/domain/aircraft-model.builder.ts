import { v7 as uuidv7 } from 'uuid'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'
import { AircraftModelProps } from 'src/modules/aircraft-models/domain/aircraft-model-types'
import { AircraftModelStatus } from 'src/modules/aircraft-models/domain/aircraft-model-enums'
import { AIRCRAFT_MODEL_CONSTRAINTS as LIMITS } from 'src/modules/aircraft-models/domain/aircraft-model-constants'
import { randomString } from '../../shared/utils/random-string'
import { randomNumber } from '../../shared/utils/random-number'
import { randomEnumValue } from '../../shared/utils/random-enum'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class AircraftModelBuilder {
  private props: AircraftModelProps = {
    id: uuidv7(),
    name: randomString(LIMITS.NAME.MIN_LENGTH, LIMITS.NAME.MAX_LENGTH),
    code: randomString(LIMITS.CODE.MIN_LENGTH, LIMITS.CODE.MAX_LENGTH).trim().toUpperCase(),
    manufacturer: randomString(LIMITS.MANUFACTURER.MIN_LENGTH, LIMITS.MANUFACTURER.MAX_LENGTH),
    passengerCapacity: randomNumber(LIMITS.PASSENGERS.MIN, LIMITS.PASSENGERS.MAX),
    numEngines: randomNumber(LIMITS.ENGINES.MIN, LIMITS.ENGINES.MAX),
    status: randomEnumValue(AircraftModelStatus)
  }

  static aModel(): AircraftModelBuilder {
    return new AircraftModelBuilder()
  }

  withId(id: string): AircraftModelBuilder {
    this.props.id = id
    return this
  }

  withName(name: string): AircraftModelBuilder {
    this.props.name = name
    return this
  }

  withCode(code: string): AircraftModelBuilder {
    this.props.code = code.trim().toUpperCase()
    return this
  }

  withManufacturer(manufacturer: string): AircraftModelBuilder {
    this.props.manufacturer = manufacturer
    return this
  }

  withNumEngines(count: number): AircraftModelBuilder {
    this.props.numEngines = count
    return this
  }

  withPassengers(count: number): AircraftModelBuilder {
    this.props.passengerCapacity = count
    return this
  }

  withStatus(status: AircraftModelStatus): AircraftModelBuilder {
    this.props.status = status
    return this
  }

  withProps(overrides?: Partial<AircraftModelProps>): AircraftModelBuilder {
    this.props = { ...this.props, ...overrides }
    return this
  }

  create(): AircraftModel {
    return AircraftModel.create({
      id: this.props.id,
      name: this.props.name,
      code: this.props.code,
      manufacturer: this.props.manufacturer,
      passengerCapacity: this.props.passengerCapacity,
      numEngines: this.props.numEngines
    })
  }

  build(): AircraftModel {
    return AircraftModel.reconstruct(this.props)
  }
}
