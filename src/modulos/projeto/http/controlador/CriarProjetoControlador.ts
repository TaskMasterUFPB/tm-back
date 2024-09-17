import { FastifyReply, FastifyRequest } from "fastify";
import { fabricaProjeto } from "../../servicos/fabrica/fabrica-projeto";
import { z } from "zod";
import { CriarProjeto } from "../../dtos/ICriaProjeto";

export async function CriarProjetoControlador(request: FastifyRequest, reply: FastifyReply) {
    const ValidacaoValoresParaCriarProjeto = z.object({
        nome: z.string(),
        descricao: z.string(),
        id_criador: z.string(),
        id_lider: z.string(),
        url: z.string(),
        dataInicio: z.date().optional(),
        participantes_id: z.array(z.string())
    })

    const dadosProjeto: CriarProjeto = ValidacaoValoresParaCriarProjeto.parse(request.body)

    try {
        const projeto = fabricaProjeto()
        await projeto.criar(dadosProjeto)

    } catch (err) {
        return reply.status(500).send({ message: 'Erro interno' })
    }
}