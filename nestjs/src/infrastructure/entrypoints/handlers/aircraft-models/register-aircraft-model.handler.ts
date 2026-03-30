import { Injectable } from '@nestjs/common'
import { RegisterAircraftModelUseCase } from 'src/modules/aircraft-models/application/create/register-aircraft-model-usecase.service'
import { RegisterAircraftModelDto } from '../../dtos/aircraft-models/register-aircraft-model.dto'

@Injectable()
export class RegisterAircraftModelHandler {
  constructor(
    private readonly useCase: RegisterAircraftModelUseCase
  ) {}

  async run(dto: RegisterAircraftModelDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
