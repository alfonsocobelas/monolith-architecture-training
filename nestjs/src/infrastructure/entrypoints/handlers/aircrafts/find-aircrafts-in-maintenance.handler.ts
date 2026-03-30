import { Injectable } from '@nestjs/common'
import { FindAircraftsInMaintenanceUseCase } from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-usecase.service'
import { FindAircraftsInMaintenanceResponse } from '../../dtos/aircrafts/find-aircrafts-in-maintenance.response'

@Injectable()
export class FindAircraftsInMaintenanceHandler {
  constructor(
    private readonly useCase: FindAircraftsInMaintenanceUseCase
  ) {}

  async run(): Promise<FindAircraftsInMaintenanceResponse[]> {
    return this.useCase.invoke()
  }
}
