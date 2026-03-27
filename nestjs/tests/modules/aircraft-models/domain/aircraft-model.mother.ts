import { AircraftModelCreateProps, AircraftModelPrimitiveProps, AircraftModelProps } from 'src/modules/aircraft-models/domain/aircraft-model-types'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'
import { AircraftModelBuilder } from './aircraft-model.builder'
import { AircraftModelStatus } from 'src/modules/aircraft-models/domain/aircraft-model-enums'
import { repeat } from '../../shared/utils/random-array'

export class AircraftModelMother {
  static fromInput(input: Partial<AircraftModelPrimitiveProps>): AircraftModel {
    return AircraftModelBuilder.aModel().withProps(input as Partial<AircraftModelProps>).build()
  }

  static register(overrides?: Partial<AircraftModelCreateProps>): AircraftModel {
    return AircraftModelBuilder.aModel().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<AircraftModelProps>): AircraftModel {
    return AircraftModelBuilder.aModel().withProps(overrides).build()
  }

  static random(): AircraftModel {
    return AircraftModelBuilder.aModel().build()
  }

  static randomList(count: number = 5): AircraftModel[] {
    return repeat(() => this.random(), count)
  }

  static privateJet(): AircraftModel {
    return AircraftModelBuilder
      .aModel()
      .withStatus(AircraftModelStatus.OPERATIONAL)
      .withPassengers(10)
      .withNumEngines(2)
      .build()
  }

  static commercialGiant(): AircraftModel {
    return AircraftModelBuilder
      .aModel()
      .withStatus(AircraftModelStatus.OPERATIONAL)
      .withPassengers(400)
      .withNumEngines(4)
      .build()
  }
}
