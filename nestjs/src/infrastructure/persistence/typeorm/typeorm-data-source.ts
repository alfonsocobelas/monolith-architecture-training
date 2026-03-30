import { DataSource } from 'typeorm'
import TypeOrmConfigFactory from './typeorm-config.factory'

// Load TypeORM configuration to initialize the DataSource for migrations
const config = TypeOrmConfigFactory.createConfig()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  database: config.database,
  synchronize: config.synchronize,
  dropSchema: config.dropSchema,
  logging: config.logging,
  entities: ['src/modules/**/infrastructure/typeorm/*entity.{js,ts}'],
  migrations: ['src/migrations/*{.js,.ts}'],
  migrationsTransactionMode: 'all',
  subscribers: []
})
