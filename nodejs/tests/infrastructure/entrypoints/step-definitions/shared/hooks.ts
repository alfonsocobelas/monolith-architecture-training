import * as sinon from 'sinon'
import { DataSource } from 'typeorm'
import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { ContainerNamespaces } from 'src/infrastructure/dependency-injection/enums'
import { App } from 'src/infrastructure/app'
import { MyWorld } from './world'
import { EnvironmentArranger } from '../../../arranger/environment-arranger'

let application: App
let clock: sinon.SinonFakeTimers
let environmentArranger: EnvironmentArranger
let dataSource: DataSource

setDefaultTimeout(30000)

BeforeAll(async () => {
  application = new App()
  await application.start()

  const container = application.getContainer()
  environmentArranger = await container.get(ContainerNamespaces.EnvironmentArranger)
  dataSource = await container.get(ContainerNamespaces.ConnectionManager)

  if (!dataSource.isInitialized) {
    await dataSource.initialize()
  }

  await dataSource.runMigrations()
})

AfterAll(async () => {
  if (environmentArranger) {
    await environmentArranger.close()
  }
  await application.stop()
})

Before(async function (this: MyWorld) {
  this.app = application
  this.arranger = environmentArranger

  if (!this.arranger) {
    throw new Error('EnvironmentArranger not found in container')
  }

  await this.arranger.arrange()
  // reset shared context
  this.queryParams = {}
  this.currentFilters = []
  this.currentOrders = []
  this.savedCursor = null
})

Before({ tags: '@fixedTime' }, function (this: MyWorld) {
  clock = sinon.useFakeTimers(new Date('2024-03-16T10:00:00Z').getTime())
})

After({ tags: '@fixedTime' }, function (this: MyWorld) {
  if (clock) {
    clock.restore()
  }
})
