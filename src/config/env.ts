import { z } from 'zod'
import 'dotenv/config'

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().default(3333),

  // Apenas a DATABASE_URL é necessária para a conexão com o Prisma
  DATABASE_URL: z.string().url(),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(
    '❌ Erro na validação das variáveis de ambiente:',
    _env.error.format(),
  )
  throw new Error('Variáveis de ambiente inválidas')
}

export const Env = _env.data
