import { INestApplication, ValidationPipe, VersioningType } from '@nestjs/common'
import { NestExpressApplication } from '@nestjs/platform-express'
import { GlobalExceptionFilter } from './infrastructure/entrypoints/filters/http-exception.filter'

export function setupApp(app: INestApplication | NestExpressApplication) {
  if ('set' in app) {
    (app as NestExpressApplication).set('query parser', 'extended')
  }

  app.setGlobalPrefix('api')

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  })

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      disableErrorMessages: process.env.NODE_ENV === 'production'
    })
  )

  app.useGlobalFilters(new GlobalExceptionFilter())

  return app
}
