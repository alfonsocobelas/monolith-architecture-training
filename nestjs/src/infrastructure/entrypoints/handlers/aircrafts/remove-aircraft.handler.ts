import { Injectable } from '@nestjs/common'
import { RemoveAircraftUseCase } from 'src/modules/aircrafts/application/delete/remove-aircraft-usecase.service'

@Injectable()
export class RemoveAircraftHandler {
  constructor(
    private readonly useCase: RemoveAircraftUseCase
  ) {}

  async run(id: string): Promise<void> {
    await this.useCase.invoke({ id })
  }
}
