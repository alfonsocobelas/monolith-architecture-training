import { Injectable } from '@nestjs/common'
import { RegisterAircraftUseCase } from 'src/modules/aircrafts/application/create/register-aircraft-usecase.service'
import { RegisterAircraftDto } from '../../dtos/aircrafts/register-aircraft.dto'

@Injectable()
export class RegisterAircraftHandler {
  constructor(
    private readonly useCase: RegisterAircraftUseCase
  ) {}

  async run(dto: RegisterAircraftDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
