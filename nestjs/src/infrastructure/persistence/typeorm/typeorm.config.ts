export interface TypeOrmConfig {
  host: string
  port: number
  username: string
  password: string
  database: string
  synchronize: boolean
  dropSchema: boolean
  logging: boolean
  migrationsRun: boolean
}
