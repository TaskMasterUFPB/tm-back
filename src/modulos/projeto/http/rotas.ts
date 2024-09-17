import { FastifyInstance } from "fastify";
import { CirarProjetoControlador } from "./controlador/CriarProjetoControlador";

export async function RotasProjeto(app: FastifyInstance) {
    app.post('/criarProjeto', CirarProjetoControlador)
}