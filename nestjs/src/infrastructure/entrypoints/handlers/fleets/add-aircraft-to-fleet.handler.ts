import { Injectable } from '@nestjs/common'
import { AddAircraftToFleetUsecase } from 'src/modules/fleets/application/update/add-aircraft-to-fleet-usecase.service'
import { AddAircraftToFleetDto } from '../../dtos/fleets/add-aircraft-to-fleet.dto'

@Injectable()
export class AddAircraftToFleetHandler {
  constructor(
    private readonly useCase: AddAircraftToFleetUsecase
  ) {}

  async run(dto: AddAircraftToFleetDto): Promise<void> {
    await this.useCase.invoke(dto)
  }
}
