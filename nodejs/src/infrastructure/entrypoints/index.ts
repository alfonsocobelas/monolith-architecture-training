/* eslint-disable @typescript-eslint/no-var-requires */
import { Router } from 'express'
import * as glob from 'glob'
import { ContainerBuilder } from 'node-dependency-injection'

export async function registerRoutes(router: Router, container: ContainerBuilder): Promise<void> {
  const routes = glob.sync(__dirname + '/**/*.route.*')

  for (const routePath of routes) {
    register(routePath, router, container)
  }
}

function register(routePath: string, router: Router, container: ContainerBuilder): void {
  const route = require(routePath)

  route.register(router, container)
}
