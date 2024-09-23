import fastify from 'fastify'
import cors from '@fastify/cors'
import { RotasProjeto } from './modulos/projeto/http/rotas';
import { RotasUsuario } from './modulos/usuario/http/rotas';

export const app = fastify();

app.register(cors)

app.register(RotasProjeto, { prefix: '/projeto' })
app.register(RotasUsuario, { prefix: '/usuario' })
