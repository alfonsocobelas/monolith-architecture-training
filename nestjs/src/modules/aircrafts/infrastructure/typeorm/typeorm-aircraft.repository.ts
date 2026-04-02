import { EntityTarget, In } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { Nullable } from 'src/common/nullable'
import { Criteria } from 'src/modules/shared/domain/query/criteria'
import { TypeOrmRepository } from 'src/infrastructure/persistence/typeorm/typeorm.repository'
import { TypeOrmCriteriaConverter } from 'src/infrastructure/persistence/typeorm/typeorm-criteria-converter'
import { TypeOrmTransactionManager } from 'src/infrastructure/persistence/typeorm/typeorm-transaction-manager'
import { AircraftEntity } from './typeorm-aircraft.entity'
import { AircraftMapper } from './typeorm-aircraft.mapper'
import { Aircraft } from '../../domain/aircraft'
import { AircraftReadModel } from '../../domain/aircraft-types'
import { AircraftRepository } from '../../domain/aircraft.repository'

const JOIN_ENGINE = ['aircraft.engines', 'engine'] as const
const JOIN_MODEL = ['aircraft.model', 'model'] as const
const AIRCRAFT_FIELDS = ['aircraft']
const ENGINE_FIELDS = ['engine.id', 'engine.healthScore']
const MODEL_FIELDS = ['model.id', 'model.name', 'model.numEngines']
const SELECT_FIELDS = [...AIRCRAFT_FIELDS, ...ENGINE_FIELDS, ...MODEL_FIELDS]

@Injectable()
export class TypeOrmAircraftRepository
  extends TypeOrmRepository<AircraftEntity>
  implements AircraftRepository
{
  constructor(txManager: TypeOrmTransactionManager, converter: TypeOrmCriteriaConverter) {
    super(txManager, converter)
  }

  protected entitySchema(): EntityTarget<AircraftEntity> {
    return AircraftEntity
  }

  async register(aircraft: Aircraft): Promise<void> {
    const repository = this.repository()
    const entity = AircraftMapper.toPersistence(aircraft)

    await repository.insert(entity)
  }

  async save(aircrafts: Aircraft | Aircraft[]): Promise<void> {
    const entities = Array.isArray(aircrafts)
      ? aircrafts.map(AircraftMapper.toPersistence)
      : AircraftMapper.toPersistence(aircrafts)

    await this.persist(entities)
  }

  async remove(aircraft: Aircraft): Promise<void> {
    const repository = this.repository()
    await repository.delete(aircraft.id)
  }

  async exists(criteria: Criteria): Promise<boolean> {
    return this.existsByCriteria(criteria)
  }

  async get(aircraftId: string): Promise<Nullable<Aircraft>> {
    const repository = this.repository()

    const entity = await repository.findOneBy({ id: aircraftId })

    if (!entity) {
      return null
    }

    return AircraftMapper.toDomain(entity)
  }

  async getTechnicalSheet(aircraftId: string): Promise<Nullable<AircraftReadModel>> {
    const repository = this.repository()

    const entity = await repository
      .createQueryBuilder('aircraft')
      .leftJoinAndSelect(...JOIN_ENGINE)
      .leftJoinAndSelect(...JOIN_MODEL)
      .select(SELECT_FIELDS)
      .where('aircraft.id = :aircraftId', { aircraftId })
      .getOne()

    if (!entity) {
      return null
    }

    return AircraftMapper.toReadModel(entity)
  }

  async find(aircraftIds: string[]): Promise<Aircraft[]> {
    const repository = this.repository()

    const entities = await repository.findBy({ id: In(aircraftIds) })

    return entities.map(entity => AircraftMapper.toDomain(entity))
  }

  async findTechnicalSheets(aircraftIds: string[]): Promise<AircraftReadModel[]> {
    const repository = this.repository()

    const entities = await repository
      .createQueryBuilder('aircraft')
      .leftJoinAndSelect(...JOIN_ENGINE)
      .leftJoinAndSelect(...JOIN_MODEL)
      .select(SELECT_FIELDS)
      .where('aircraft.id IN (:...aircraftIds)', { aircraftIds })
      .getMany()

    return entities.map(entity => AircraftMapper.toReadModel(entity))
  }

  async matching(criteria: Criteria): Promise<Aircraft[]> {
    const entities = await this.searchByCriteria(criteria)

    return entities.map(entity => AircraftMapper.toDomain(entity))
  }

  async count(criteria: Criteria): Promise<number> {
    return this.countByCriteria(criteria)
  }
}
