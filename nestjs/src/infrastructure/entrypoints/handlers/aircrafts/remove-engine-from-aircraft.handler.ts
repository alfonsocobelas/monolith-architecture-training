import { Injectable } from '@nestjs/common'
import { RemoveEngineFromAircraftUsecase } from 'src/modules/aircrafts/application/update/remove-engine-from-aircraft-usecase.service'
import { RemoveEngineFromAircraftDto } from '../../dtos/aircrafts/remove-engine-from-aircraft.dto'

@Injectable()
export class RemoveEngineFromAircraftHandler {
  constructor(
    private readonly useCase: RemoveEngineFromAircraftUsecase
  ) {}

  async run(dto: RemoveEngineFromAircraftDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
