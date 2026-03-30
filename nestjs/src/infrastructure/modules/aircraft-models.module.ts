import { Module } from '@nestjs/common'
import { GetAircraftModelUseCase } from 'src/modules/aircraft-models/application/find/get-aircraft-model-usecase.service'
import { RemoveAircraftModelUseCase } from 'src/modules/aircraft-models/application/delete/remove-aircraft-model-usecase.service'
import { RegisterAircraftModelUseCase } from 'src/modules/aircraft-models/application/create/register-aircraft-model-usecase.service'
import { ListAircraftModelCatalogueUseCase } from 'src/modules/aircraft-models/application/find/list-aircraft-model-catalogue-usecase.service'
import { AircraftModelRepository } from 'src/modules/aircraft-models/domain/aircraft-model.repository'
import { TypeOrmAircraftModelRepository } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.repository'
import { GetAircraftModelHandler } from '../entrypoints/handlers/aircraft-models/get-aircraft-model.handler'
import { RemoveAircraftModelHandler } from '../entrypoints/handlers/aircraft-models/remove-aircraft-model.handler'
import { RegisterAircraftModelHandler } from '../entrypoints/handlers/aircraft-models/register-aircraft-model.handler'
import { ListAircraftModelCatalogueHandler } from '../entrypoints/handlers/aircraft-models/list-aircraft-model-catalogue.handler'
import { AircraftModelsController } from '../entrypoints/controllers/aircraft-models.controller'

@Module({
  controllers: [AircraftModelsController],
  providers: [
    // Handlers
    RegisterAircraftModelHandler,
    GetAircraftModelHandler,
    ListAircraftModelCatalogueHandler,
    RemoveAircraftModelHandler,
    // Use Cases
    RegisterAircraftModelUseCase,
    RemoveAircraftModelUseCase,
    GetAircraftModelUseCase,
    ListAircraftModelCatalogueUseCase,
    // Repositories
    {
      provide: AircraftModelRepository,
      useClass: TypeOrmAircraftModelRepository
    }
  ]
})
export class AircraftModelsModule {}
