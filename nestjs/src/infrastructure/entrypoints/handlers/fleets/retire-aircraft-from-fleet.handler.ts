import { Injectable } from '@nestjs/common'
import { RetireAircraftFromFleetInput } from 'src/modules/fleets/application/update/retire-aircraft-from-fleet-input'
import { RetireAircraftFromFleetUsecase } from 'src/modules/fleets/application/update/retire-aircraft-from-fleet-usecase.service'

@Injectable()
export class RetireAircraftFromFleetHandler {
  constructor(
    private readonly useCase: RetireAircraftFromFleetUsecase
  ) {}

  async run(input: RetireAircraftFromFleetInput): Promise<void> {
    await this.useCase.invoke(input)
  }
}
