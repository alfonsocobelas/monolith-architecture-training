import { ListAircraftModelCatalogueOutput } from 'src/modules/aircraft-models/application/find/list-aircraft-model-catalogue-output.dto'
import { AircraftModel } from 'src/modules/aircraft-models/domain/aircraft-model'

export class ListAircraftModelCatalogueOutputMother {
  static fromDomain(domain: AircraftModel): ListAircraftModelCatalogueOutput {
    return {
      id: domain.id,
      name: domain.name,
      manufacturer: domain.manufacturer,
      passengerCapacity: domain.passengerCapacity,
      numEngines: domain.numEngines,
      status: domain.status
    }
  }
}
