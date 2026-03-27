import { ContainerBuilder } from 'node-dependency-injection'
import config from './config'
import { Server } from './server'

// declare global imports
import 'src/infrastructure/types/express'

export class App {
  server?: Server

  constructor() {}

  get httpServer() {
    if (!this.server) {
      throw new Error('Server not initialized. Call start() first.')
    }
    return this.server.getHTTPServer()
  }

  get container(): ContainerBuilder {
    if (!this.server) {
      throw new Error('Server not initialized. Call start() first.')
    }
    return this.server.getContainer()
  }

  async start(): Promise<void> {
    const port = config.get('port')
    this.server = new Server(port)

    await this.server.init()
    await this.server.listen()
  }

  async stop(): Promise<void> {
    if (!this.server) {
      throw new Error('Server not initialized. Call start() first.')
    }
    await this.server.stop()
  }
}
