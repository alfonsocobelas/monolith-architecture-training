import convict from 'convict'

const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['prod', 'dev', 'qa', 'test', 'local'],
    default: 'local',
    env: 'NODE_ENV'
  },
  port: {
    doc: 'The port to bind.',
    format: 'port',
    default: '3000',
    env: 'PORT',
    arg: 'port'
  },
  typeorm: {
    host: {
      doc: 'The database host',
      format: String,
      env: 'TYPEORM_HOST',
      default: ''
    },
    port: {
      doc: 'The database port',
      format: Number,
      env: 'TYPEORM_PORT',
      default: 5432
    },
    username: {
      doc: 'The database username',
      format: String,
      env: 'POSTGRES_USER',
      default: ''
    },
    password: {
      doc: 'The database password',
      format: String,
      env: 'POSTGRES_PASSWORD',
      default: ''
    },
    database: {
      doc: 'The database name',
      format: String,
      env: 'POSTGRES_DB',
      default: ''
    },
    synchronize: {
      doc: 'The database synchronize',
      format: Boolean,
      env: 'POSTGRES_SYNCHRONIZE',
      default: false
    },
    dropSchema: {
      doc: 'The database dropSchema',
      format: Boolean,
      env: 'POSTGRES_DROP_SCHEMA',
      default: false
    },
    logging: {
      doc: 'The database logging',
      format: Boolean,
      env: 'POSTGRES_LOGGING',
      default: false
    },
    migrationsRun: {
      doc: 'The database migrationsRun',
      format: Boolean,
      env: 'POSTGRES_MIGRATIONS_RUN',
      default: false
    }
  }
})

const configDir = `${__dirname}/environments`
const env = config.get('env')
const defaultConfigPath = `${configDir}/default.json`
const envConfigPath = `${configDir}/${env}.json`

config.loadFile([defaultConfigPath, envConfigPath])
config.validate({ allowed: 'strict' })
export default config
