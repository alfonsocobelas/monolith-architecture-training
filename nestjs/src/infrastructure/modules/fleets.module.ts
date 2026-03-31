import { Module } from '@nestjs/common'
import { GetFleetUseCase } from 'src/modules/fleets/application/find/get-fleet-usecase.service'
import { SearchFleetsUseCase } from 'src/modules/fleets/application/paginate/search-fleets-usecase.service'
import { RegisterFleetUseCase } from 'src/modules/fleets/application/create/register-fleet-usecase.service'
import { AddAircraftToFleetUsecase } from 'src/modules/fleets/application/update/add-aircraft-to-fleet-usecase.service'
import { RetireAircraftFromFleetUsecase } from 'src/modules/fleets/application/update/retire-aircraft-from-fleet-usecase.service'
import { RetireAircraftsFromFleetUsecase } from 'src/modules/fleets/application/update/retire-aircrafts-from-fleet-usecase.service'
import { TypeOrmFleetRepository } from 'src/modules/fleets/infrastructure/typeorm/typeorm-fleet.repository'
import { FleetRepository } from 'src/modules/fleets/domain/fleet.repository'
import { RegisterFleetHandler } from '../entrypoints/handlers/fleets/register-fleet.handler'
import { GetFleetHandler } from '../entrypoints/handlers/fleets/get-fleet.handler'
import { SearchFleetsHandler } from '../entrypoints/handlers/fleets/search-fleets.handler'
import { AddAircraftToFleetHandler } from '../entrypoints/handlers/fleets/add-aircraft-to-fleet.handler'
import { RetireAircraftFromFleetHandler } from '../entrypoints/handlers/fleets/retire-aircraft-from-fleet.handler'
import { RetireAircraftsFromFleetHandler } from '../entrypoints/handlers/fleets/retire-aircrafts-from-fleet.handler'
import { FleetsController } from '../entrypoints/controllers/fleets.controller'
import { AircraftsModule } from './aircrafts.module'

@Module({
  imports: [AircraftsModule],
  controllers: [FleetsController],
  providers: [
    // Handlers
    RegisterFleetHandler,
    GetFleetHandler,
    AddAircraftToFleetHandler,
    RetireAircraftFromFleetHandler,
    RetireAircraftsFromFleetHandler,
    SearchFleetsHandler,
    // Use Cases
    RegisterFleetUseCase,
    GetFleetUseCase,
    AddAircraftToFleetUsecase,
    RetireAircraftFromFleetUsecase,
    RetireAircraftsFromFleetUsecase,
    SearchFleetsUseCase,
    // Repositories
    {
      provide: FleetRepository,
      useClass: TypeOrmFleetRepository
    }
  ],
  exports: [FleetRepository]
})
export class FleetsModule {}
