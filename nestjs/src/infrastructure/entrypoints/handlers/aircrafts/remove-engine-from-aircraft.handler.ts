import { Injectable } from '@nestjs/common'
import { RemoveEngineFromAircraftUsecase } from 'src/modules/aircrafts/application/update/remove-engine-from-aircraft-usecase.service'

@Injectable()
export class RemoveEngineFromAircraftHandler {
  constructor(
    private readonly useCase: RemoveEngineFromAircraftUsecase
  ) {}

  async run(aircraftId: string, engineId: string): Promise<void> {
    await this.useCase.invoke({ aircraftId, engineId })
  }
}
