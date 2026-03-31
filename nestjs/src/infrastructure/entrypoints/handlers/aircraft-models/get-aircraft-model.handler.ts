import { Injectable } from '@nestjs/common'
import { GetAircraftModelUseCase } from 'src/modules/aircraft-models/application/find/get-aircraft-model-usecase.service'
import { GetAircraftModelResponse } from '../../dtos/aircraft-models/get-aircraft-model.response'

@Injectable()
export class GetAircraftModelHandler {
  constructor(
    private readonly useCase: GetAircraftModelUseCase
  ) {}

  async run(id: string): Promise<GetAircraftModelResponse> {
    return this.useCase.invoke({ id })
  }
}
