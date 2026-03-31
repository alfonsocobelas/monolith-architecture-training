import * as sinon from 'sinon'
import { DataSource } from 'typeorm'
import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from '@cucumber/cucumber'
import { AppModule } from 'src/app.module'
import { setupApp } from 'src/setup.app'
import { MyWorld } from './world'
import { EnvironmentArranger } from '../../../arranger/environment-arranger'
import { TypeOrmEnvironmentArranger } from '../../../arranger/typeorm/typeorm-environment-arranger'

let application: INestApplication
let moduleFixture: TestingModule
let clock: sinon.SinonFakeTimers
let environmentArranger: EnvironmentArranger

setDefaultTimeout(30000)

BeforeAll(async () => {
  moduleFixture = await Test.createTestingModule({
    imports: [AppModule],
    providers: [{ provide: EnvironmentArranger, useClass: TypeOrmEnvironmentArranger }]
  }).compile()

  application = moduleFixture.createNestApplication()
  setupApp(application)
  await application.init()

  const dataSource = moduleFixture.get<DataSource>(DataSource)
  environmentArranger = moduleFixture.get<EnvironmentArranger>(EnvironmentArranger)

  if (!dataSource.isInitialized) {
    await dataSource.initialize()
  }
})

AfterAll(async () => {
  if (environmentArranger) {
    await environmentArranger.close()
  }

  if (application) {
    await application.close()
  }
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
