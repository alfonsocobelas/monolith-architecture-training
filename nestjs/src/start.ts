import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { AppModule } from './app.module'
import { setupApp } from './setup.app'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  setupApp(app)

  const configService = app.get(ConfigService)
  const port = configService.get('app.port')
  await app.listen(port || 3000)
}
bootstrap()
