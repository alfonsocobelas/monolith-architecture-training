import config from '../../config'
import { TypeOrmConfig } from './typeorm.config'

export default class TypeOrmConfigFactory {
  static createConfig(): TypeOrmConfig {
    return {
      host: config.get('typeorm.host'),
      port: config.get('typeorm.port'),
      username: config.get('typeorm.username'),
      password: config.get('typeorm.password'),
      database: config.get('typeorm.database'),
      synchronize: config.get('typeorm.synchronize') || false,
      dropSchema: config.get('typeorm.dropSchema') || false,
      logging: config.get('typeorm.logging') || false,
      migrationsRun: config.get('typeorm.migrationsRun') || false
    }
  }
}
