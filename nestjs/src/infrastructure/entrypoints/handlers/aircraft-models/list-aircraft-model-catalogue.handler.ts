import { Injectable } from '@nestjs/common'
import { ListAircraftModelCatalogueUseCase } from 'src/modules/aircraft-models/application/find/list-aircraft-model-catalogue-usecase.service'
import { ListAircraftModelCatalogueResponse } from '../../dtos/aircraft-models/list-aircraft-model-catalogue.response'

@Injectable()
export class ListAircraftModelCatalogueHandler {
  constructor(
    private readonly useCase: ListAircraftModelCatalogueUseCase
  ) {}

  async run(): Promise<ListAircraftModelCatalogueResponse[]> {
    return this.useCase.invoke()
  }
}
