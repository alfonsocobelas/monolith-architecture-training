import { Injectable } from '@nestjs/common'
import { GetFleetUseCase } from 'src/modules/fleets/application/find/get-fleet-usecase.service'
import { GetFleetResponse } from '../../dtos/fleets/get-fleet.response'
import { IdParamDto } from '../../dtos/shared/id-param.dto'

@Injectable()
export class GetFleetHandler {
  constructor(
    private readonly useCase: GetFleetUseCase
  ) {}

  async run(id: IdParamDto): Promise<GetFleetResponse> {
    return this.useCase.invoke(id)
  }
}
