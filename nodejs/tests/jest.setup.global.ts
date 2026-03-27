/* eslint-disable @typescript-eslint/no-var-requires */
import { DataSource } from 'typeorm'
import { GlobalSeed } from './global-seed'
import TypeOrmConfigFactory from '../src/infrastructure/persistence/typeorm/typeorm-config.factory'

require('tsconfig-paths').register()
require('ts-node').register({
  project: 'tsconfig.json',
  transpileOnly: true
})

export default async () => {
  const seedManager = GlobalSeed.getInstance()
  const masterSeed = seedManager.getMasterSeed()
  process.env.JEST_MASTER_SEED = String(masterSeed)

  if (process.env.JEST_ENV === 'integration') {
    const config = TypeOrmConfigFactory.createConfig()
    const migrationDataSource = new DataSource({
      type: 'postgres',
      host: config.host,
      port: config.port,
      username: config.username,
      password: config.password,
      database: config.database,
      entities: ['src/modules/**/infrastructure/typeorm/*entity.ts'],
      migrations: ['src/migrations/*.ts']
    })

    try {
      if (!migrationDataSource.isInitialized) {
        await migrationDataSource.initialize()
      }

      await migrationDataSource.runMigrations()

      await migrationDataSource.destroy()
    } catch (error) {
      console.error('[JEST GLOBAL] ❌ Migration failed:', error)
      process.exit(1)
    }
  }
}
