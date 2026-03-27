import { v7 as uuidv7 } from 'uuid'
import { RegisterAircraftInput } from 'src/modules/aircrafts/application/create/register-aircraft-input.dto'
import { AircraftCreateProps, AircraftPrimitiveProps, AircraftProps } from 'src/modules/aircrafts/domain/aircraft-types'
import { Aircraft } from 'src/modules/aircrafts/domain/aircraft'
import { AircraftStatus } from 'src/modules/aircrafts/domain/aircraft-enums'
import { AircraftBuilder } from './aircraft.builder'
import { randomEnumValue } from '../../shared/utils/random-enum'
import { randomBoolean } from '../../shared/utils/random-boolean'
import { repeat } from '../../shared/utils/random-array'

export class AircraftMother {
  static fromInput(input: Partial<AircraftPrimitiveProps>): Aircraft {
    return AircraftBuilder.anAircraft().withProps(input as Partial<AircraftProps>).build()
  }

  static register(overrides?: Partial<AircraftCreateProps>): Aircraft {
    return AircraftBuilder.anAircraft().withProps(overrides).create()
  }

  static reconstruct(overrides?: Partial<AircraftProps>): Aircraft {
    return AircraftBuilder.anAircraft().withProps(overrides).build()
  }

  static random(): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withStatus(randomEnumValue(AircraftStatus))
      .withIsActive(randomBoolean())
      .build()
  }

  static randomList(count: number = 5): Aircraft[] {
    return repeat(() => this.random(), count)
  }

  static initial(overrides: RegisterAircraftInput): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withId(overrides.id)
      .withModelId(overrides.modelId)
      .withTailNumber(overrides.tailNumber)
      .build()
  }

  static activeInFlight(aircraftId: string = uuidv7()): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withId(aircraftId)
      .withStatus(AircraftStatus.ACTIVE)
      .withEngineIds([uuidv7(), uuidv7()])
      .withFleetId(uuidv7())
      .withFlightHours(500)
      .withIsActive(true)
      .build()
  }

  static inMaintenance() {
    return AircraftBuilder
      .anAircraft()
      .withStatus(AircraftStatus.MAINTENANCE)
      .withFleetId(uuidv7())
      .withIsActive(false)
      .build()
  }

  static orfan() {
    return AircraftBuilder
      .anAircraft()
      .withStatus(AircraftStatus.STORED)
      .withEngineIds([uuidv7(), uuidv7()])
      .withIsActive(false)
      .build()
  }

  static free(aircraftId: string = uuidv7()): Aircraft {
    return AircraftBuilder
      .anAircraft()
      .withId(aircraftId)
      .withEngineIds([])
      .withStatus(AircraftStatus.ACTIVE)
      .withIsActive(true)
      .build()
  }
}
