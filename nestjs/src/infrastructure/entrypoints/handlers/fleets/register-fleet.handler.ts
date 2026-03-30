import { Injectable } from '@nestjs/common'
import { RegisterFleetUseCase } from 'src/modules/fleets/application/create/register-fleet-usecase.service'
import { RegisterFleetDto } from '../../dtos/fleets/register-fleet.dto'

@Injectable()
export class RegisterFleetHandler {
  constructor(
    private readonly useCase: RegisterFleetUseCase
  ) {}

  async run(dto: RegisterFleetDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
