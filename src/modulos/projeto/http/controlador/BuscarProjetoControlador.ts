import { FastifyReply, FastifyRequest } from "fastify";
import { fabricaProjeto } from "../../servicos/fabrica/fabrica-projeto";

export async function BuscarPorProjetoControlador(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params
    try {
        const projeto = fabricaProjeto()
        return await projeto.buscarPorId(id)

    } catch (err) {
        return reply.status(500).send({ message: 'Erro interno' })
    }
}