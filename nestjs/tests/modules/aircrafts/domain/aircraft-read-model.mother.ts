import { AircraftReadModel } from 'src/modules/aircrafts/domain/aircraft-types'
import { AircraftReadModelBuilder } from './aircraft-read-model.builder'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'
import { Engine } from 'src/modules/engines/domain/engine'

export class AircraftReadModelMother {
  static random(): AircraftReadModel {
    return AircraftReadModelBuilder.aTechnicalSheet().build()
  }

  static technicalSheet(id: string, model: AircraftModel, engines: Engine[]): AircraftReadModel {
    return AircraftReadModelBuilder
      .aTechnicalSheet()
      .withId(id)
      .withModel(model)
      .withEngines(engines)
      .build()
  }
}
