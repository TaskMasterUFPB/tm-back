import { FastifyReply, FastifyRequest } from "fastify";
import { fabricaProjeto } from "../../servicos/fabrica/fabrica-projeto";

export async function DeletarProjetoControlador(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const { id } = request.params
    try {
        const projeto = fabricaProjeto()
        await projeto.deletar(id)
    } catch (err) {
        return reply.status(500).send({ message: 'Erro interno' })
    }
}