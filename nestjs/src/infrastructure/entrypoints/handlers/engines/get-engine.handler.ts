import { Injectable } from '@nestjs/common'
import { GetEngineUseCase } from 'src/modules/engines/application/find/get-engine-usecase.service'
import { GetEngineResponse } from '../../dtos/engines/get-engine.response'

@Injectable()
export class GetEngineHandler {
  constructor(
    private readonly useCase: GetEngineUseCase
  ) {}

  async run(id: string): Promise<GetEngineResponse> {
    return this.useCase.invoke({ id })
  }
}
