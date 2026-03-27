import config from './config'
import { Server } from './server'

// declare global imports
import 'src/infrastructure/types/express'

export class App {
  server?: Server

  async start() {
    const port = config.get('port')
    this.server = new Server(port)

    await this.server.init()

    return this.server.listen()
  }

  getContainer() {
    if (!this.server) {
      throw new Error('Server not initialized. Call start() first.')
    }

    return this.server.getContainer()
  }

  get httpServer() {
    const httpServer = this.server?.getHTTPServer()

    if (!httpServer) {
      throw new Error('HTTP Server not initialized')
    }

    return httpServer
  }

  async stop() {
    return this.server?.stop()
  }
}
