import { EntityTarget } from 'typeorm'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { FleetEntity } from './typeorm-fleet.entity'
import { FleetMapper } from './typeorm-fleet.mapper'
import { FleetRepository } from '../../domain/fleet.repository'
import { Fleet } from '../../domain/fleet'

export default class TypeOrmFleetRepository extends TypeOrmRepository<FleetEntity> implements FleetRepository {
  protected entitySchema(): EntityTarget<FleetEntity> {
    return FleetEntity
  }

  async register(fleet: Fleet): Promise<void> {
    const repository = await this.repository()
    const entity = FleetMapper.toPersistence(fleet)

    await repository.insert(entity)
  }

  async save(fleets: Fleet | Fleet[]): Promise<void> {
    await this.persist(fleets, FleetMapper)
  }

  async get(fleetId: string): Promise<Nullable<Fleet>> {
    const repository = await this.repository()
    const entity = await repository.findOneBy({ id: fleetId })

    if (!entity) {
      return null
    }

    return FleetMapper.toDomain(entity)
  }

  async matching(criteria: Criteria): Promise<Fleet[]> {
    const items = await this.searchByCriteria(criteria)

    return items.map(entity => FleetMapper.toDomain(entity))
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }

  async count(criteria: Criteria): Promise<number> {
    return this.countByCriteria(criteria)
  }
}
