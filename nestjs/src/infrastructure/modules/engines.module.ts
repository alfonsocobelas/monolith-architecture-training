import { Module } from '@nestjs/common'
import { GetEngineUseCase } from 'src/modules/engines/application/find/get-engine-usecase.service'
import { SearchEnginesUseCase } from 'src/modules/engines/application/paginate/search-engines-usecase.service'
import { RegisterEngineUseCase } from 'src/modules/engines/application/create/register-engine-usecase.service'
import { EngineRepository } from 'src/modules/engines/domain/engine.repository'
import { TypeOrmEngineRepository } from 'src/modules/engines/infrastructure/typeorm/typeorm-engine.repository'
import { GetEngineHandler } from '../entrypoints/handlers/engines/get-engine.handler'
import { SearchEnginesHandler } from '../entrypoints/handlers/engines/search-engines.handler'
import { RegisterEngineHandler } from '../entrypoints/handlers/engines/register-engine.handler'
import { EnginesController } from '../entrypoints/controllers/engines.controller'

@Module({
  controllers: [EnginesController],
  providers: [
    // Handlers
    RegisterEngineHandler,
    GetEngineHandler,
    SearchEnginesHandler,
    // Use Cases
    RegisterEngineUseCase,
    GetEngineUseCase,
    SearchEnginesUseCase,
    // Repositories
    {
      provide: EngineRepository,
      useClass: TypeOrmEngineRepository
    }
  ]
})
export class EnginesModule {}
