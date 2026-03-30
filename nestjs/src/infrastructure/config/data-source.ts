import { DataSource } from 'typeorm'
import { readFileSync } from 'fs'
import { join } from 'path'

const env = process.env.NODE_ENV || 'dev'
const configPath = join(__dirname, `environments/${env}.json`)
const config = JSON.parse(readFileSync(configPath, 'utf8'))

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: config.typeorm.host,
  port: config.typeorm.port,
  username: config.typeorm.username,
  password: config.typeorm.password,
  database: config.typeorm.database,
  synchronize: config.typeorm.synchronize,
  dropSchema: config.typeorm.dropSchema,
  logging: config.typeorm.logging,
  migrationsTransactionMode: 'all',
  entities: [join(__dirname, '/../**/*.entity.{ts,js}')],
  migrations: [join(__dirname, '/../migrations/*.{ts,js}')],
  subscribers: []
})
