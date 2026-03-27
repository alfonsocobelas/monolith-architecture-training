/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, EntityMetadata } from 'typeorm'
import { EnvironmentArranger } from '../../arranger/environment-arranger'

export default class TypeOrmEnvironmentArranger extends EnvironmentArranger {
  constructor(private _client: Promise<DataSource>) {
    super()
  }

  async arrange(): Promise<void> {
    await this.cleanDatabase()
  }

  async close(): Promise<void> {
    await this.cleanDatabase()
    return (await this._client).destroy()
  }

  async insertOne<T>(entity: { new (): T }, data: Partial<T>): Promise<void> {
    const repository = (await this._client).getRepository(entity)
    await repository.save(data)
  }

  async insertMany<T>(entity: { new (): T }, dataArray: Partial<T>[]): Promise<void> {
    const repository = (await this._client).getRepository(entity)
    await repository.save(dataArray)
  }

  async findOneBy<T>(entity: { new (): T }, query: any): Promise<T | null> {
    const repository = (await this._client).getRepository(entity)
    return repository.findOneBy(query) as T | null
  }

  async find<T>(entity: { new (): T }, query: any): Promise<T[]> {
    const repository = (await this._client).getRepository(entity)
    return (repository.findBy(query) as unknown as T[]) || []
  }

  protected client(): Promise<DataSource> {
    return this._client
  }

  protected async cleanDatabase(): Promise<void> {
    const entities = await this.entities()
    const tableNames = entities.map(e => `"${e.tableName}"`).join(', ')

    try {
      if (tableNames.length) {
        await (await this._client).query(`TRUNCATE TABLE ${tableNames} RESTART IDENTITY CASCADE;`)
      }
    } catch (error) {
      throw new Error(`Unable to clean test database: ${error}`)
    }
  }

  private async entities(): Promise<EntityMetadata[]> {
    return (await this._client).entityMetadatas
  }
}
