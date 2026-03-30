import { registerAs } from '@nestjs/config'
import { readFileSync } from 'fs'
import { join } from 'path'
import { validate } from './env.validation'

export default registerAs('typeorm', () => {
  const env = process.env.NODE_ENV || 'test'
  const path = join(__dirname, `environments/${env}.json`)
  const file = JSON.parse(readFileSync(path, 'utf8'))

  validate(file)

  return {
    ...file.typeorm,
    entities: [join(__dirname, '../../**/*.entity.{ts,js}')],
    migrations: [join(__dirname, '../../migrations/*.{ts,js}')],
    subscribers: []
  }
})
