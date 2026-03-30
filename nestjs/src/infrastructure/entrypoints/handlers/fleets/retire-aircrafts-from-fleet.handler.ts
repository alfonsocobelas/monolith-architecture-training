import { Injectable } from '@nestjs/common'
import { RetireAircraftsFromFleetInput } from 'src/modules/fleets/application/update/retire-aircrafts-from-fleet-input.dto'
import { RetireAircraftsFromFleetUsecase } from 'src/modules/fleets/application/update/retire-aircrafts-from-fleet-usecase.service'

@Injectable()
export class RetireAircraftsFromFleetHandler {
  constructor(
    private readonly useCase: RetireAircraftsFromFleetUsecase
  ) {}

  async run(input: RetireAircraftsFromFleetInput): Promise<void> {
    await this.useCase.invoke(input)
  }
}
