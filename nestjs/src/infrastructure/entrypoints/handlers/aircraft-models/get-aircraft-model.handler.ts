import { Injectable } from '@nestjs/common'
import { GetAircraftModelUseCase } from 'src/modules/aircraft-models/application/find/get-aircraft-model-usecase.service'
import { GetAircraftModelResponse } from '../../dtos/aircraft-models/get-aircraft-model.response'
import { IdParamDto } from '../../dtos/shared/id-param.dto'

@Injectable()
export class GetAircraftModelHandler {
  constructor(
    private readonly useCase: GetAircraftModelUseCase
  ) {}

  async run(id: IdParamDto): Promise<GetAircraftModelResponse> {
    return this.useCase.invoke(id)
  }
}
