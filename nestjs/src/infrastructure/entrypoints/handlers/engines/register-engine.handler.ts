import { Injectable } from '@nestjs/common'
import { RegisterEngineUseCase } from 'src/modules/engines/application/create/register-engine-usecase.service'
import { RegisterEngineDto } from '../../dtos/engines/register-engine.dto'

@Injectable()
export class RegisterEngineHandler {
  constructor(
    private readonly useCase: RegisterEngineUseCase
  ) {}

  async run(dto: RegisterEngineDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
