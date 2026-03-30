import { Injectable } from '@nestjs/common'
import { GetAircraftUseCase } from 'src/modules/aircrafts/application/find/get-aircraft-usecase.service'
import { IdParamDto } from '../../dtos/shared/id-param.dto'
import { GetAircraftResponse } from '../../dtos/aircrafts/get-aircraft.response'

@Injectable()
export class GetAircraftHandler {
  constructor(
    private readonly useCase: GetAircraftUseCase
  ) {}

  async run(id: IdParamDto): Promise<GetAircraftResponse> {
    return this.useCase.invoke(id)
  }
}
