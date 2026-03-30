import { DataSource } from 'typeorm'
import { Nullable } from 'src/common/nullable'
import { TypeOrmConfig } from './typeorm.config'

export default class TypeOrmClientFactory {
  private static clients: { [key: string]: DataSource } = {}

  static async createClient(contextName: string, config: TypeOrmConfig): Promise<DataSource> {
    let client = this.getClient(contextName)

    if (!client) {
      client = await TypeOrmClientFactory.createAndConnectClient(config)
      TypeOrmClientFactory.registerClient(client, contextName)
    }

    return client
  }

  static clearClients(): void {
    TypeOrmClientFactory.clients = {}
  }

  private static async createAndConnectClient(config: TypeOrmConfig): Promise<DataSource> {
    const dataSource = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      synchronize: config.synchronize,
      dropSchema: config.dropSchema,
      logging: config.logging,
      entities: ['src/modules/**/infrastructure/typeorm/*entity{.js,.ts}'],
      migrations: ['src/migrations/*{.js,.ts}'],
      migrationsRun: config.migrationsRun,
      migrationsTransactionMode: 'all',
      subscribers: []
    })

    try {
      if (!dataSource.isInitialized) {
        await dataSource.initialize()
      }

      return dataSource
    } catch (error) {
      console.log('Error initializing TypeORM DataSource:', error)
      throw error
    }
  }

  private static getClient(contextName: string): Nullable<DataSource> {
    return TypeOrmClientFactory.clients[contextName]
  }

  private static registerClient(client: DataSource, contextName: string): void {
    TypeOrmClientFactory.clients[contextName] = client
  }
}
