import * as fc from 'fast-check'
import { faker } from '@faker-js/faker'
import { GlobalSeed } from './global-seed'

/**
 * Initialize global Faker and fast-check seed and log it for reproducibility
 */
(function initializeGlobalSeed() {
  const seedManager = GlobalSeed.getInstance()
  const masterSeed = seedManager.getMasterSeed()

  faker.seed(masterSeed)
  fc.configureGlobal({
    seed: masterSeed,
    endOnFailure: false,
    verbose: false
  })

  if (process.env.JEST_WORKER_ID === undefined || process.env.JEST_WORKER_ID === '1') {
    // console.log(`\n[JEST UNIT] 🎲 Master Seed: ${masterSeed}\n`)
  }
})()

beforeEach(() => {
  const testName = expect.getState().currentTestName || 'default-unit-test'
  const seedManager = GlobalSeed.getInstance()
  const renewedSeed = seedManager.getReseed(testName)
  faker.seed(renewedSeed)
})
