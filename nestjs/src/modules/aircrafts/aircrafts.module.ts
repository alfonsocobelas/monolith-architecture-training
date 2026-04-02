import { Module, forwardRef } from '@nestjs/common'
import { AircraftsController } from 'src/infrastructure/entrypoints/controllers/aircrafts.controller'
import { GetAircraftUseCase } from 'src/modules/aircrafts/application/find/get-aircraft-usecase.service'
import { RemoveAircraftUseCase } from 'src/modules/aircrafts/application/delete/remove-aircraft-usecase.service'
import { SearchAircraftsUseCase } from 'src/modules/aircrafts/application/paginate/search-aircrafts-usecase.service'
import { RegisterAircraftUseCase } from 'src/modules/aircrafts/application/create/register-aircraft-usecase.service'
import { InstallEngineInAircraftUsecase } from 'src/modules/aircrafts/application/update/install-engine-in-aircraft-usecase.service'
import { RemoveEngineFromAircraftUsecase } from 'src/modules/aircrafts/application/update/remove-engine-from-aircraft-usecase.service'
import { FindAircraftsInMaintenanceUseCase } from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-usecase.service'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { TypeOrmAircraftRepository } from 'src/modules/aircrafts/infrastructure/typeorm/typeorm-aircraft.repository'
import { GetAircraftHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/get-aircraft.handler'
import { RemoveAircraftHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/remove-aircraft.handler'
import { SearchAircraftsHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/search-aircrafts.handler'
import { RegisterAircraftHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/register-aircraft.handler'
import { InstallEngineInAircraftHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/install-engine-in-aircraft.handler'
import { RemoveEngineFromAircraftHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/remove-engine-from-aircraft.handler'
import { FindAircraftsInMaintenanceHandler } from 'src/infrastructure/entrypoints/handlers/aircrafts/find-aircrafts-in-maintenance.handler'
import { AircraftModelsModule } from '../aircraft-models/aircraft-models.module'
import { EnginesModule } from '../engines/engines.module'

@Module({
  imports: [
    forwardRef(() => AircraftModelsModule),
    EnginesModule
  ],
  controllers: [AircraftsController],
  providers: [
    // Handlers
    RegisterAircraftHandler,
    GetAircraftHandler,
    FindAircraftsInMaintenanceHandler,
    InstallEngineInAircraftHandler,
    RemoveEngineFromAircraftHandler,
    RemoveAircraftHandler,
    SearchAircraftsHandler,
    // Use Cases
    RegisterAircraftUseCase,
    GetAircraftUseCase,
    FindAircraftsInMaintenanceUseCase,
    InstallEngineInAircraftUsecase,
    RemoveEngineFromAircraftUsecase,
    RemoveAircraftUseCase,
    SearchAircraftsUseCase,
    // Repositories
    {
      provide: AircraftRepository,
      useClass: TypeOrmAircraftRepository
    }
  ],
  exports: [AircraftRepository]
})
export class AircraftsModule {}
