import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { Env } from './config/env'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  await app.listen(Env.PORT)
  console.log(`🚀 Servidor rodando em http://localhost:${Env.PORT}`)
}
bootstrap()
