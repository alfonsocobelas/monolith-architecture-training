import { Module } from '@nestjs/common'
import { AircraftModelsModule } from './infrastructure/modules/aircraft-models.module'
import { AircraftsModule } from './infrastructure/modules/aircrafts.module'
import { CompaniesModule } from './infrastructure/modules/companies.module'
import { EnginesModule } from './infrastructure/modules/engines.module'
import { FleetsModule } from './infrastructure/modules/fleets.module'
import { IssuesModule } from './infrastructure/modules/issues.module'
import { CoreConfigModule } from './infrastructure/config/config.module'
import { PersistenceModule } from './infrastructure/persistence/persistence.module'

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
