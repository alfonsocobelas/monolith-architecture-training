/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, EntityManager, EntityMetadata } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { EnvironmentArranger } from '../../arranger/environment-arranger'

@Injectable()
export class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  constructor(private dataSource: DataSource) {
    super()
  }

  protected client(): EntityManager {
    return this.dataSource.manager
  }

  protected repository<EntityType>(entity: { new (): EntityType }) {
    return this.client().getRepository(entity)
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    await this.cleanDatabase()
  }

  async insertOne<T>(entity: { new (): T }, data: Partial<T>): Promise<void> {
    const repository = this.repository(entity)
    await repository.save(data)
  }

  async insertMany<T>(entity: { new (): T }, dataArray: Partial<T>[]): Promise<void> {
    const repository = this.repository(entity)
    await repository.save(dataArray)
  }

  async findOneBy<T>(entity: { new (): T }, query: any): Promise<T | null> {
    const repository = this.repository(entity)
    return repository.findOneBy(query) as T | null
  }

  async find<T>(entity: { new (): T }, query: any): Promise<T[]> {
    const repository = this.repository(entity)
    return (repository.findBy(query) as unknown as T[]) || []
  }

  protected async cleanDatabase(): Promise<void> {
    const entities = this.entities()
    const tableNames = entities.map(e => `"${e.tableName}"`).join(', ')

    if (!tableNames.length) {
      return
    }

    try {
      await this.client().query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`)
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`)
    }
  }

  private entities(): EntityMetadata[] {
    return this.dataSource.entityMetadatas
  }
}
