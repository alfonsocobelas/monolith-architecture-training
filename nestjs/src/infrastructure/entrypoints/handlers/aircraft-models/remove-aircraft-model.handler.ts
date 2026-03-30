import { Injectable } from '@nestjs/common'
import { RemoveAircraftModelUseCase } from 'src/modules/aircraft-models/application/delete/remove-aircraft-model-usecase.service'
import { IdParamDto } from '../../dtos/shared/id-param.dto'

@Injectable()
export class RemoveAircraftModelHandler {
  constructor(
    private readonly useCase: RemoveAircraftModelUseCase
  ) {}

  async run(id: IdParamDto): Promise<void> {
    await this.useCase.invoke(id)
  }
}
