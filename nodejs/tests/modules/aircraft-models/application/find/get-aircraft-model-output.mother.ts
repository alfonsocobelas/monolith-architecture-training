import { GetAircraftModelOutput } from 'src/modules/aircraft-models/application/find/get-aircraft-model-output.dto'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'

export class GetAircraftModelOutputMother {
  static fromDomain(aircraftModel: AircraftModel): GetAircraftModelOutput {
    return {
      id: aircraftModel.id,
      name: aircraftModel.name,
      code: aircraftModel.code,
      manufacturer: aircraftModel.manufacturer,
      passengerCapacity: aircraftModel.passengerCapacity,
      numEngines: aircraftModel.numEngines,
      status: aircraftModel.status
    }
  }
}
