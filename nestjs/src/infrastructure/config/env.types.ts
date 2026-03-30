export interface TypeORMConfig {
  type: string
  host: string
  port: number
  username: string
  password: string
  database: string
  synchronize: boolean
  dropSchema: boolean
  logging: boolean
  autoLoadEntities: boolean
  migrationsTransactionMode: string
  migrationsRun: boolean
}

export interface AppConfig {
  env: string;
  port: number;
  typeorm: TypeORMConfig;
}
