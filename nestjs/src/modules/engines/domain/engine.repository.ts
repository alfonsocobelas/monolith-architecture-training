import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Engine } from './engine'

export abstract class EngineRepository {
  abstract register(engine: Engine): Promise<void>
  abstract save(engines: Engine | Engine[]): Promise<void>
  abstract get(engineId: string): Promise<Nullable<Engine>>
  abstract exists(serialNumber: string): Promise<boolean>
  abstract matching(criteria: Criteria): Promise<Engine[]>
}
