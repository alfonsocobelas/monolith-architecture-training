import { Injectable } from '@nestjs/common'
import { EntityNotFoundError } from 'src/common/errors'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { AircraftModelRepository } from 'src/modules/aircraft-models/domain/aircraft-model.repository'
import { EngineRepository } from 'src/modules/engines/domain/engine.repository'
import { InstallEngineInAircraftInput } from './install-engine-in-aircraft-input.dto'
import { TransactionManager } from 'src/modules/shared/domain/persistence/transaction-manager'

@Injectable()
export class InstallEngineInAircraftUsecase {
  constructor(
    private readonly engineRepository: EngineRepository,
    private readonly aircraftRepository: AircraftRepository,
    private readonly aircraftModelRepository: AircraftModelRepository,
    private readonly txManager: TransactionManager
  ) {}

  async invoke(input: InstallEngineInAircraftInput): Promise<void> {
    const [engine, aircraft] = await Promise.all([
      this.engineRepository.get(input.engineId),
      this.aircraftRepository.get(input.aircraftId)
    ])

    if (!engine) {
      throw new EntityNotFoundError('Engine', input.engineId)
    }

    if (!aircraft) {
      throw new EntityNotFoundError('Aircraft', input.aircraftId)
    }

    const model = await this.aircraftModelRepository.get(aircraft.modelId)

    if (!model) {
      throw new EntityNotFoundError('AircraftModel', aircraft.modelId)
    }

    aircraft.installEngine(input.engineId, model.numEngines)
    engine.installInAircraft(input.aircraftId)

    await this.txManager.runInTransaction(async () => {
      await this.aircraftRepository.save(aircraft)
      await this.engineRepository.save(engine)
    })
  }
}
