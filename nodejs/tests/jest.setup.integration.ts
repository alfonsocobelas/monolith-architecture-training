import { faker } from '@faker-js/faker'
import { DataSource, QueryRunner } from 'typeorm'
import { ContainerBuilder } from 'node-dependency-injection'
import loadContainer from 'src/infrastructure/dependency-injection'
import { ContainerNamespaces } from 'src/infrastructure/dependency-injection/enums'
import { EnvironmentArranger } from './infrastructure/arranger/environment-arranger'
import { GlobalSeed } from './global-seed'

let container: ContainerBuilder
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
  // console.log(`\n[JEST INTEGRATION] 🎲 Master Seed: ${masterSeed}\n`)
})()

beforeAll(async () => {
  container = await loadContainer()
  environmentArranger = await container.get(ContainerNamespaces.EnvironmentArranger)
  dataSource = await container.get(ContainerNamespaces.ConnectionManager)
})

afterAll(async () => {
  if (environmentArranger) {
    await environmentArranger.close()
  } else {
    console.warn('[JEST INTEGRATION] ⚠️ No environment arranger available to close.')
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

  queryRunner = dataSource.createQueryRunner()
  await queryRunner.connect()
  await queryRunner.startTransaction()
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

export { container, environmentArranger, dataSource, queryRunner }
