import { Module } from '@nestjs/common'
import { GetAircraftUseCase } from 'src/modules/aircrafts/application/find/get-aircraft-usecase.service'
import { RemoveAircraftUseCase } from 'src/modules/aircrafts/application/delete/remove-aircraft-usecase.service'
import { SearchAircraftsUseCase } from 'src/modules/aircrafts/application/paginate/search-aircrafts-usecase.service'
import { RegisterAircraftUseCase } from 'src/modules/aircrafts/application/create/register-aircraft-usecase.service'
import { InstallEngineInAircraftUsecase } from 'src/modules/aircrafts/application/update/install-engine-in-aircraft-usecase.service'
import { RemoveEngineFromAircraftUsecase } from 'src/modules/aircrafts/application/update/remove-engine-from-aircraft-usecase.service'
import { FindAircraftsInMaintenanceUseCase } from 'src/modules/aircrafts/application/find/find-aircrafts-in-maintenance-usecase.service'
import { AircraftRepository } from 'src/modules/aircrafts/domain/aircraft.repository'
import { TypeOrmAircraftRepository } from 'src/modules/aircrafts/infrastructure/typeorm/typeorm-aircraft.repository'
import { GetAircraftHandler } from '../entrypoints/handlers/aircrafts/get-aircraft.handler'
import { RemoveAircraftHandler } from '../entrypoints/handlers/aircrafts/remove-aircraft.handler'
import { RegisterAircraftHandler } from '../entrypoints/handlers/aircrafts/register-aircraft.handler'
import { SearchAircraftsHandler } from '../entrypoints/handlers/aircrafts/search-aircrafts.handler'
import { InstallEngineInAircraftHandler } from '../entrypoints/handlers/aircrafts/install-engine-in-aircraft.handler'
import { RemoveEngineFromAircraftHandler } from '../entrypoints/handlers/aircrafts/remove-engine-from-aircraft.handler'
import { FindAircraftsInMaintenanceHandler } from '../entrypoints/handlers/aircrafts/find-aircrafts-in-maintenance.handler'
import { AircraftsController } from '../entrypoints/controllers/aircrafts.controller'

@Module({
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
  ]
})
export class AircraftsModule {}
