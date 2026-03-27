import 'reflect-metadata'
import { App } from './infrastructure/app'

try {
  new App().start()
} catch (err) {
  console.log(err)
  process.exit(1)
}

process.on('uncaughtException', err => {
  console.log('uncaughtException', err)
  process.exit(1)
})
