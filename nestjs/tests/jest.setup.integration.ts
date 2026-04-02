import { faker } from '@faker-js/faker'
import { DataSource, QueryRunner } from 'typeorm'
import { Test, TestingModule } from '@nestjs/testing'
import { GlobalSeed } from './global-seed'
import { EnvironmentArranger } from './infrastructure/arranger/environment-arranger'
import { PersistenceModule } from 'src/infrastructure/persistence/persistence.module'
import { TypeOrmEnvironmentArranger } from './infrastructure/arranger/typeorm/typeorm-environment-arranger'
import { CoreConfigModule } from 'src/infrastructure/config/config.module'
import { TestRepositoriesModule } from './infrastructure/test-repositories.module'

let moduleFixture: TestingModule
let environmentArranger: EnvironmentArranger
let dataSource: DataSource
let queryRunner: QueryRunner

/**
 * Initialize global Faker seed and log it for reproducibility
 */
(function initializeGlobalSeed() {
  const seedManager = GlobalSeed.getInstance()
  const masterSeed = seedManager.getMasterSeed()
  faker.seed(masterSeed)
})()

beforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [PersistenceModule, CoreConfigModule, TestRepositoriesModule],
    providers: [{ provide: EnvironmentArranger, useClass: TypeOrmEnvironmentArranger }]
  }).compile()

  const app = moduleFixture.createNestApplication()
  await app.init()

  dataSource = moduleFixture.get<DataSource>(DataSource)
  environmentArranger = moduleFixture.get<EnvironmentArranger>(EnvironmentArranger)
})

afterAll(async () => {
  if (environmentArranger) {
    await environmentArranger.close()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No environment arranger available to close.')
  }

  if (dataSource && dataSource.isInitialized) {
    await dataSource.destroy()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No data source available to destroy.')
  }

  if (moduleFixture) {
    await moduleFixture.close()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No module fixture available to close.')
  }
})

beforeEach(async () => {
  const currentTestName = expect.getState().currentTestName || 'default-integration-test'
  const seedManager = GlobalSeed.getInstance()
  const renewedSeed = seedManager.getReseed(currentTestName)
  faker.seed(renewedSeed)

  if (environmentArranger) {
    await environmentArranger.arrange()
  }

  if (dataSource) {
    queryRunner = dataSource.createQueryRunner()
    await queryRunner.connect()
    await queryRunner.startTransaction()
  }
})

afterEach(async () => {
  if (queryRunner && queryRunner.isTransactionActive) {
    await queryRunner.rollbackTransaction()
    await queryRunner.release()
  } else if (queryRunner) {
    await queryRunner.release()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No query runner available to rollback transaction.')
  }
})

export { environmentArranger, dataSource, queryRunner, moduleFixture }
