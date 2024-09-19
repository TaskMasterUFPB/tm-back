import { z } from "zod";
import 'dotenv/config';

const envSchema = z.object({
    NODE_ENV: z.enum(['prod', 'dev', 'test']).default('dev'),
    PORT: z.coerce.number().default(3000),
})

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error(`Error ao carregar variáveis de ambiente ${_env.error.format}`);
    throw new Error('Invalid environment variable')
}

export const env = _env.data
