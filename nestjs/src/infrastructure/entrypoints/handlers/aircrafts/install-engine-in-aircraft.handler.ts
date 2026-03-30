import { Injectable } from '@nestjs/common'
import { InstallEngineInAircraftUsecase } from 'src/modules/aircrafts/application/update/install-engine-in-aircraft-usecase.service'
import { InstallEngineInAircraftDto } from '../../dtos/aircrafts/install-engine-in-aircraft.dto'

@Injectable()
export class InstallEngineInAircraftHandler {
  constructor(
    private readonly useCase: InstallEngineInAircraftUsecase
  ) {}

  async run(dto: InstallEngineInAircraftDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
