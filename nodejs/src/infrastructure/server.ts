import express from 'express'
import compress from 'compression'
import helmet from 'helmet'
import * as http from 'http'
import { registerRoutes } from './entrypoints'
import { errorHandler } from './entrypoints/middlewares/error-handler.middleware'
import { ContainerBuilder } from 'node-dependency-injection'
import loadContainer from './dependency-injection'

export class Server {
  private express: express.Express
  private port: string
  private httpServer?: http.Server
  private router: express.Router
  private container?: ContainerBuilder

  constructor(port: string) {
    this.port = port
    this.express = express()
    this.express.use(express.json())
    this.express.use(express.urlencoded({ extended: true }))
    this.express.use(helmet())
    this.express.use(compress())

    this.router = express.Router()
    this.express.use('/api', this.router)
  }

  getHTTPServer(): http.Server {
    if (!this.httpServer) {
      throw new Error('HTTP Server not initialized. Call listen() first.')
    }
    return this.httpServer
  }

  getContainer(): ContainerBuilder {
    if (!this.container) {
      throw new Error('Container not initialized. Call init() first.')
    }
    return this.container
  }

  async init(): Promise<void> {
    this.container = await loadContainer()

    await registerRoutes(this.router, this.container)

    this.router.use(errorHandler)
  }

  async listen(): Promise<void> {
    return new Promise(resolve => {
      this.httpServer = this.express.listen(this.port, () => {
        this.printStartupMessage()
        resolve()
      })
    })
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.httpServer) {
        this.httpServer.close(error => {
          if (error) {
            return reject(error)
          }
          return resolve()
        })
      }

      return resolve()
    })
  }

  private printStartupMessage() {
    const green = '\x1b[32m'
    const yellow = '\x1b[33m'
    const bold = '\x1b[1m'
    const reset = '\x1b[0m'

    // todo: modificat el host para que sea configurable
    console.log(`${green}${bold}✔ Mooc Backend App is running at${reset} ${yellow}http://localhost:${this.port}${reset} in ${this.express.get('env')} mode`)
    console.log(`${green}${bold}✔${reset} Press ${bold}CTRL-C${reset} to stop\n`)
  }
}
