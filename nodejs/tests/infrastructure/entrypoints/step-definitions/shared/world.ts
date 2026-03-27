import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber'
import request from 'supertest'
import { App } from 'src/infrastructure/app'
import { EnvironmentArranger } from '../../../arranger/environment-arranger'

// Context class to share state between steps
export class MyWorld extends World {
  app?: App
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
