import { v7 as uuidv7 } from 'uuid'
import { Engine } from 'src/modules/engines/domain/engine'
import { AircraftStatus } from 'src/modules/aircrafts/domain/aircraft-enums'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'
import { AircraftReadModel } from 'src/modules/aircrafts/domain/aircraft-types'
import { AIRCRAFT_CONSTRAINTS as LIMITS } from 'src/modules/aircrafts/domain/aircraft-constants'
import { randomString } from '../../shared/utils/random-string'
import { randomNumber } from '../../shared/utils/random-number'
import { AIRCRAFT_MODEL_CONSTRAINTS as MODEL_LIMITS } from 'src/modules/aircraft-models/domain/aircraft-model-constants'
import { ENGINE_CONSTRAINTS as ENGINE_LIMITS } from 'src/modules/engines/domain/engine-constants'

/**
 * IMPORTANT: In integration tests, be careful with fields that have uniqueness constraints.
 * You must set them manually to avoid collisions with other objects created in the database
 *  during test execution.
 */
export class AircraftReadModelBuilder {
  private modelId = uuidv7()
  private engineId1 = uuidv7()
  private engineId2 = uuidv7()

  private props: AircraftReadModel = {
    id: uuidv7(),
    modelId: this.modelId,
    engineIds: [this.engineId1, this.engineId2],
    tailNumber: randomString(LIMITS.TAIL_NUMBER.MIN_LENGTH, LIMITS.TAIL_NUMBER.MAX_LENGTH),
    totalFlightHours: randomNumber(LIMITS.FLIGHT_HOURS.MIN, LIMITS.FLIGHT_HOURS.MAX),
    fuelLevelPercentage: randomNumber(LIMITS.FUEL_LEVEL.MIN, LIMITS.FUEL_LEVEL.MAX),
    isActive: true,
    status: AircraftStatus.ACTIVE,
    model: {
      id: this.modelId,
      name: randomString(MODEL_LIMITS.NAME.MIN_LENGTH, MODEL_LIMITS.NAME.MAX_LENGTH),
      numEngines: 2
    },
    engines: [
      { id: this.engineId1, healthScore: randomNumber(ENGINE_LIMITS.HEALTH_SCORE.MIN, ENGINE_LIMITS.HEALTH_SCORE.MAX) },
      { id: this.engineId2, healthScore: randomNumber(ENGINE_LIMITS.HEALTH_SCORE.MIN, ENGINE_LIMITS.HEALTH_SCORE.MAX) }
    ]
  }

  static aTechnicalSheet(): AircraftReadModelBuilder {
    return new AircraftReadModelBuilder()
  }

  withId(id: string): this {
    this.props.id = id
    return this
  }

  withModel(model: AircraftModel): this {
    this.props.modelId = model.id
    this.props.model.id = model.id
    this.props.model.name = model.name
    this.props.model.numEngines = model.numEngines
    return this
  }

  withEngines(engines: Engine[]): this {
    for (const engin of engines) {
      this.props.engines.push({ id: engin.id, healthScore: engin.healthScore })
      this.props.engineIds.push(engin.id)
    }
    return this
  }

  build(): AircraftReadModel {
    return { ...this.props }
  }
}
