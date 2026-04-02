import { Module, forwardRef } from '@nestjs/common'
import { AircraftModelsController } from 'src/infrastructure/entrypoints/controllers/aircraft-models.controller'
import { GetAircraftModelUseCase } from 'src/modules/aircraft-models/application/find/get-aircraft-model-usecase.service'
import { RemoveAircraftModelUseCase } from 'src/modules/aircraft-models/application/delete/remove-aircraft-model-usecase.service'
import { RegisterAircraftModelUseCase } from 'src/modules/aircraft-models/application/create/register-aircraft-model-usecase.service'
import { ListAircraftModelCatalogueUseCase } from 'src/modules/aircraft-models/application/find/list-aircraft-model-catalogue-usecase.service'
import { AircraftModelRepository } from 'src/modules/aircraft-models/domain/aircraft-model.repository'
import { TypeOrmAircraftModelRepository } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.repository'
import { GetAircraftModelHandler } from 'src/infrastructure/entrypoints/handlers/aircraft-models/get-aircraft-model.handler'
import { RemoveAircraftModelHandler } from 'src/infrastructure/entrypoints/handlers/aircraft-models/remove-aircraft-model.handler'
import { RegisterAircraftModelHandler } from 'src/infrastructure/entrypoints/handlers/aircraft-models/register-aircraft-model.handler'
import { ListAircraftModelCatalogueHandler } from 'src/infrastructure/entrypoints/handlers/aircraft-models/list-aircraft-model-catalogue.handler'
import { AircraftsModule } from '../aircrafts/aircrafts.module'

@Module({
  imports: [forwardRef(() => AircraftsModule)],
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
  ],
  exports: [AircraftModelRepository]
})
export class AircraftModelsModule {}
