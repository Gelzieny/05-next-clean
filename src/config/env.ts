import { z } from 'zod'
import 'dotenv/config'

// Define o schema das variáveis de ambiente (sem DATABASE_URL)
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),

  // PostgreSQL
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_HOST: z.string().default('localhost'),
  POSTGRES_PORT: z.coerce.number().default(5432),
})

// Valida o process.env
const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(
    '❌ Erro na validação das variáveis de ambiente:',
    _env.error.format(),
  )
  throw new Error('Variáveis de ambiente inválidas')
}

const env = _env.data

const DATABASE_URL = `postgresql://${encodeURIComponent(env.POSTGRES_USER)}:${encodeURIComponent(env.POSTGRES_PASSWORD)}@${env.POSTGRES_HOST}:${env.POSTGRES_PORT}/${env.POSTGRES_DB}`

export const Env = {
  ...env,
  DATABASE_URL,
}
