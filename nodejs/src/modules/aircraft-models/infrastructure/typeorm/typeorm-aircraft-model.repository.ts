import { EntityTarget } from 'typeorm'
import { Nullable } from 'src/common/nullable'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { AircraftModelEntity } from './typeorm-aircraft-model.entity'
import { AircraftModelMapper } from './typeorm-aircraft-model.mapper'
import { AircraftModel } from '../../domain/aircraft-model'
import { AircraftModelRepository } from '../../domain/aircraft-model.repository'

export default class TypeOrmAircraftModelRepository
  extends TypeOrmRepository<AircraftModelEntity>
  implements AircraftModelRepository
{
  protected entitySchema(): EntityTarget<AircraftModelEntity> {
    return AircraftModelEntity
  }

  async register(aircraftModel: AircraftModel): Promise<void> {
    const repository = await this.repository()
    const entity = AircraftModelMapper.toPersistence(aircraftModel)

    await repository.insert(entity)
  }

  async save(aircraftModels: AircraftModel | AircraftModel[]): Promise<void> {
    await this.persist(aircraftModels, AircraftModelMapper)
  }

  async remove(modelId: string): Promise<void> {
    const repository = await this.repository()
    await repository.delete(modelId)
  }

  async get(modelId: string): Promise<Nullable<AircraftModel>> {
    const repository = await this.repository()
    const entity = await repository.findOneBy({ id: modelId })

    if (!entity) {
      return null
    }

    return AircraftModelMapper.toDomain(entity)
  }

  async listCatalogue(): Promise<AircraftModel[]> {
    const repository = await this.repository()
    const entities = await repository.find()

    return entities.map(entity => AircraftModelMapper.toDomain(entity))
  }

  async exists(code: string): Promise<boolean> {
    const repository = await this.repository()

    const existEntity = await repository
      .createQueryBuilder('model')
      .where('model.code = :code', { code })
      .select('1')
      .getExists()

    return existEntity
  }
}
