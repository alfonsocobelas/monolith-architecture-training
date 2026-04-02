import { Module } from '@nestjs/common'
import { CoreConfigModule } from './infrastructure/config/config.module'
import { PersistenceModule } from './infrastructure/persistence/persistence.module'
import { AircraftModelsModule } from './modules/aircraft-models/aircraft-models.module'
import { AircraftsModule } from './modules/aircrafts/aircrafts.module'
import { CompaniesModule } from './modules/companies/companies.module'
import { EnginesModule } from './modules/engines/engines.module'
import { FleetsModule } from './modules/fleets/fleets.module'
import { IssuesModule } from './modules/issues/issues.module'

@Module({
  imports: [
    // infrastructure
    CoreConfigModule,
    PersistenceModule,
    // modules
    AircraftModelsModule,
    AircraftsModule,
    CompaniesModule,
    EnginesModule,
    FleetsModule,
    IssuesModule
  ]
})
export class AppModule {}
