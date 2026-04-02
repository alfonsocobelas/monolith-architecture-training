import { Module } from '@nestjs/common'
import { TypeOrmAircraftModelRepository } from 'src/modules/aircraft-models/infrastructure/typeorm/typeorm-aircraft-model.repository'
import { TypeOrmAircraftRepository } from 'src/modules/aircrafts/infrastructure/typeorm/typeorm-aircraft.repository'
import { TypeOrmCompanyRepository } from 'src/modules/companies/infrastructure/typeorm/typeorm-company.repository'
import { TypeOrmEngineRepository } from 'src/modules/engines/infrastructure/typeorm/typeorm-engine.repository'
import { TypeOrmFleetRepository } from 'src/modules/fleets/infrastructure/typeorm/typeorm-fleet.repository'
import { TypeOrmIssueRepository } from 'src/modules/issues/infrastructure/typeorm/typeorm-issue.repository'

@Module({
  providers: [
    TypeOrmAircraftModelRepository,
    TypeOrmAircraftRepository,
    TypeOrmCompanyRepository,
    TypeOrmEngineRepository,
    TypeOrmFleetRepository,
    TypeOrmIssueRepository
  ],
  exports: [
    TypeOrmAircraftModelRepository,
    TypeOrmAircraftRepository,
    TypeOrmCompanyRepository,
    TypeOrmEngineRepository,
    TypeOrmFleetRepository,
    TypeOrmIssueRepository
  ]
})
export class TestRepositoriesModule {}
