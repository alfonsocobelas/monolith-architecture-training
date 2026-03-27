import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { Engine } from './engine'

export interface EngineRepository {
  register(engine: Engine): Promise<void>
  save(engines: Engine | Engine[]): Promise<void>
  get(engineId: string): Promise<Nullable<Engine>>
  exists(serialNumber: string): Promise<boolean>
  matching(criteria: Criteria): Promise<Engine[]>
}
