import request from 'supertest'
import { INestApplication } from '@nestjs/common'
import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber'
import { EnvironmentArranger } from '../../../arranger/environment-arranger'

// Context class to share state between steps
export class MyWorld extends World {
  app?: INestApplication
  arranger?: EnvironmentArranger
  request?: request.Test
  response?: request.Response

  queryParams: Record<string, unknown> = {}
  currentFilters: { field: string; operator: string; value: string }[] = []
  currentOrders: { orderBy: string; orderType: 'asc' | 'desc' }[] = []
  savedCursor: string | null = null

  constructor(options: IWorldOptions) {
    super(options)
  }
}

// Register context to be available in all step definitions
setWorldConstructor(MyWorld)
