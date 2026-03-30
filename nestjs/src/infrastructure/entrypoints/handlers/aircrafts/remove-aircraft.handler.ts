import { Injectable } from '@nestjs/common'
import { RemoveAircraftUseCase } from 'src/modules/aircrafts/application/delete/remove-aircraft-usecase.service'
import { IdParamDto } from '../../dtos/shared/id-param.dto'

@Injectable()
export class RemoveAircraftHandler {
  constructor(
    private readonly useCase: RemoveAircraftUseCase
  ) {}

  async run(id: IdParamDto): Promise<void> {
    await this.useCase.invoke(id)
  }
}
