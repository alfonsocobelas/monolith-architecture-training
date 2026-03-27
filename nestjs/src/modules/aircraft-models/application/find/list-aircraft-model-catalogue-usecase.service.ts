import { Injectable } from '@nestjs/common'
import { ListAircraftModelCatalogueOutput } from './list-aircraft-model-catalogue-output.dto'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'

const EMPTY_AIRCRAFT_MODEL_CATALOGUE = [] as ListAircraftModelCatalogueOutput[]

@Injectable()
export class ListAircraftModelCatalogueUseCase {
  constructor(
    private readonly repository: AircraftModelRepository
  ) {}

  async invoke(): Promise<ListAircraftModelCatalogueOutput[]> {
    const models = await this.repository.listCatalogue()

    if (!models.length) {
      return EMPTY_AIRCRAFT_MODEL_CATALOGUE
    }

    return models.map(model => ({
      id: model.id,
      name: model.name,
      manufacturer: model.manufacturer,
      passengerCapacity: model.passengerCapacity,
      numEngines: model.numEngines,
      status: model.status
    }))
  }
}
