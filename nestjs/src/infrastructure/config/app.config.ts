import { readFileSync } from 'fs'
import { join } from 'path'
import { validate } from './env.validation'

export default () => {
  const env = process.env.NODE_ENV || 'test'
  const path = join(__dirname, `environments/${env}.json`)
  const file = JSON.parse(readFileSync(path, 'utf8'))

  validate(file)

  return {
    env: file.env,
    port: file.port
  }
}
